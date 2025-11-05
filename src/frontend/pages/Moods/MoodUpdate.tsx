import React from "react";
import { Mood } from "@/backend/db/types.js";
import { MoodForm } from "./MoodForm.js";
import { MoodValue } from "@/common/types.js";

type MoodUpdateProps = {
  mood: Mood;
  onSubmit: (mood: MoodValue, note: string) => Promise<boolean>;
  onCancel: () => void;
};

export const MoodUpdate: React.FC<MoodUpdateProps> = ({
  mood,
  onSubmit,
  onCancel,
}) => {
  return (
    <MoodForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialMood={mood.mood}
      initialNote={mood.note || ""}
      isEditing={true}
    />
  );
};
