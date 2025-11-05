import React from "react";
import { SimpleForm } from "egon-ui";

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
  const handleSubmit = (values: Record<string, string | number | boolean>) => {
    onSubmit(
      values.mood as "good" | "ok" | "bad",
      (values.note as string) || ""
    );
  };

  const moodOptions = [
    { key: "good", value: "good", label: `${getMoodEmoji("good")} Good` },
    { key: "ok", value: "ok", label: `${getMoodEmoji("ok")} OK` },
    { key: "bad", value: "bad", label: `${getMoodEmoji("bad")} Bad` },
  ];

  return (
    <SimpleForm
      fields={[
        {
          name: "mood",
          label: "How are you feeling?",
          type: "select",
          options: moodOptions,
          initialValue: initialMood,
          required: true,
        },
        {
          name: "note",
          label: "Note (optional)",
          type: "textarea",
          rows: 3,
          placeholder: "Add any notes about how you're feeling...",
          initialValue: initialNote,
        },
      ]}
      onSubmit={handleSubmit}
      onCancel={isEditing ? onCancel : undefined}
      submitButtonText={isEditing ? "Update" : "Add Mood"}
    />
  );
};
