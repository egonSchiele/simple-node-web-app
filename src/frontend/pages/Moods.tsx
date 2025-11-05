import "./globals.css";
import "./ui.css";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHeading,
  CenteredLayout,
  Banner,
  Paragraph,
  VGroupSM,
} from "egon-ui";
import {
  apiMoodsGet,
  apiMoodsPost,
  apiMoodsIdPut,
  apiMoodsIdDelete,
} from "@/frontend/generated/apiClient.js";
import { Mood } from "@/backend/db/types.js";
import { MoodForm } from "./Moods/MoodForm.js";
import { MoodListItem } from "./Moods/MoodListItem.js";

const App = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiMoodsGet();
      if (response.success) {
        setMoods(response.value);
      } else {
        setError(response.error || "Failed to load moods");
      }
    } catch (err) {
      setError("Failed to load moods");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (mood: "good" | "ok" | "bad", note: string) => {
    try {
      const response = await apiMoodsPost({
        body: JSON.stringify({ mood, note: note || null }),
      });
      if (response.success) {
        await loadMoods();
        return true;
      } else {
        setError(response.error || "Failed to create mood");
        return false;
      }
    } catch (err) {
      setError("Failed to create mood");
      console.error(err);
      return false;
    }
  };

  const handleUpdate = async (
    id: number,
    mood: "good" | "ok" | "bad",
    note: string
  ) => {
    try {
      const response = await apiMoodsIdPut(id, {
        body: JSON.stringify({ mood, note: note || null }),
      });
      if (response.success) {
        await loadMoods();
        setEditingId(null);
        return true;
      } else {
        setError(response.error || "Failed to update mood");
        return false;
      }
    } catch (err) {
      setError("Failed to update mood");
      console.error(err);
      return false;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this mood?")) {
      return;
    }

    try {
      const response = await apiMoodsIdDelete(id);
      if (response.success) {
        await loadMoods();
      } else {
        setError(response.error || "Failed to delete mood");
      }
    } catch (err) {
      setError("Failed to delete mood");
      console.error(err);
    }
  };

  const getMoodEmoji = (mood: "good" | "ok" | "bad") => {
    switch (mood) {
      case "good":
        return "😊";
      case "ok":
        return "😐";
      case "bad":
        return "😞";
    }
  };

  return (
    <CenteredLayout className="p-lg min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <PageHeading>Mood Tracker</PageHeading>
        <Button onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>

      <div className="space-y-6">
        {error && (
          <Banner style="error" className="mb-4">
            {error}
          </Banner>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Add New Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodForm
              onSubmit={handleCreate}
              onCancel={() => {}}
              getMoodEmoji={getMoodEmoji}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Paragraph>Loading moods...</Paragraph>
            ) : moods.length === 0 ? (
              <Paragraph>No moods yet. Add your first mood above!</Paragraph>
            ) : (
              <VGroupSM>
                {moods.map((mood) => (
                  <MoodListItem
                    key={mood.id}
                    mood={mood}
                    isEditing={editingId === mood.id}
                    onEdit={() => setEditingId(mood.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    getMoodEmoji={getMoodEmoji}
                  />
                ))}
              </VGroupSM>
            )}
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
