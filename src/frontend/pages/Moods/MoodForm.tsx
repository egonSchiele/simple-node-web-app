import React, { useState, useEffect } from "react";
import { Button, Label, Textarea } from "egon-ui";

type MoodFormProps = {
  onSubmit: (mood: "good" | "ok" | "bad", note: string) => Promise<boolean>;
  onCancel: () => void;
  initialMood?: "good" | "ok" | "bad";
  initialNote?: string;
  getMoodEmoji: (mood: "good" | "ok" | "bad") => string;
  isEditing?: boolean;
};

export const MoodForm: React.FC<MoodFormProps> = ({
  onSubmit,
  onCancel,
  initialMood = "ok",
  initialNote = "",
  getMoodEmoji,
  isEditing = false,
}) => {
  const [mood, setMood] = useState<"good" | "ok" | "bad">(initialMood);
  const [note, setNote] = useState(initialNote);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMood(initialMood);
    setNote(initialNote);
  }, [initialMood, initialNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await onSubmit(mood, note);
    setSubmitting(false);
    if (success && !isEditing) {
      setMood("ok");
      setNote("");
    }
  };

  const moodOptions: Array<"good" | "ok" | "bad"> = ["good", "ok", "bad"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>How are you feeling?</Label>
        <div className="flex gap-4 mt-2">
          {moodOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMood(option)}
              className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                mood === option
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-4xl mb-2">{getMoodEmoji(option)}</div>
              <div className="text-sm font-medium capitalize">{option}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNote(e.target.value)
          }
          rows={3}
          placeholder="Add any notes about how you're feeling..."
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditing ? "Update" : "Add Mood"}
        </Button>
        {isEditing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
