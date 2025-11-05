import React from "react";
import { Button, Card, CardContent } from "egon-ui";
import { Mood } from "@/backend/db/types.js";
import { MoodForm } from "./MoodForm.js";

interface MoodListItemProps {
  mood: Mood;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (id: number, mood: "good" | "ok" | "bad", note: string) => Promise<boolean>;
  onDelete: (id: number) => void;
  getMoodEmoji: (mood: "good" | "ok" | "bad") => string;
}

export const MoodListItem: React.FC<MoodListItemProps> = ({
  mood,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  getMoodEmoji,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdate = async (moodValue: "good" | "ok" | "bad", note: string) => {
    return await onUpdate(mood.id, moodValue, note);
  };

  if (isEditing) {
    return (
      <Card className="border-2 border-blue-500">
        <CardContent>
          <MoodForm
            onSubmit={handleUpdate}
            onCancel={onCancelEdit}
            initialMood={mood.mood}
            initialNote={mood.note || ""}
            getMoodEmoji={getMoodEmoji}
            isEditing={true}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-4xl">{getMoodEmoji(mood.mood)}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold capitalize">{mood.mood}</span>
                <span className="text-sm text-gray-500">
                  {formatDate(mood.created_at)}
                </span>
              </div>
              {mood.note && <p className="text-gray-700">{mood.note}</p>}
              {mood.updated_at !== mood.created_at && (
                <p className="text-xs text-gray-400">
                  Updated: {formatDate(mood.updated_at)}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(mood.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
