import "../pages/globals.css";
import "../pages/ui.css";
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
  HGroupSM,
} from "egon-ui";
import {
  apiMoodsIdGet,
  apiMoodsIdPut,
  apiMoodsIdDelete,
} from "@/frontend/generated/apiClient.js";
import { Mood as MoodType } from "@/backend/db/types.js";
import { MoodUpdate } from "./Moods/MoodUpdate.jsx";
import { getMoodEmoji, formatDate } from "@/frontend/util.js";
import { MoodValue } from "@/common/types.js";

const App = () => {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadMood();
  }, []);

  const getMoodId = (): number | null => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? parseInt(id) : null;
  };

  const loadMood = async () => {
    setLoading(true);
    setError(null);
    const id = getMoodId();
    if (!id) {
      setError("No mood ID provided");
      setLoading(false);
      return;
    }

    const response = await apiMoodsIdGet(id);
    if (response.success) {
      setMood(response.value);
    } else {
      setError(response.error || "Failed to load mood");
    }
    setLoading(false);
  };

  const handleUpdate = async (moodValue: MoodValue, note: string) => {
    if (!mood) return false;

    const response = await apiMoodsIdPut(mood.id, {
      body: JSON.stringify({ mood: moodValue, note: note || null }),
    });
    if (response.success) {
      setMood(response.value);
      setIsEditing(false);
      return true;
    } else {
      setError(response.error || "Failed to update mood");
      return false;
    }
  };

  const handleDelete = async () => {
    if (!mood) return;
    if (!confirm("Are you sure you want to delete this mood?")) {
      return;
    }

    const response = await apiMoodsIdDelete(mood.id);
    if (response.success) {
      window.location.href = "/moods";
    } else {
      setError(response.error || "Failed to delete mood");
    }
  };

  return (
    <CenteredLayout className="p-lg min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <PageHeading>Mood Details</PageHeading>
        <Button onClick={() => (window.location.href = "/moods")}>
          Back to All Moods
        </Button>
      </div>

      {error && (
        <Banner style="error" className="mb-4">
          {error}
        </Banner>
      )}

      {loading ? (
        <Paragraph>Loading mood...</Paragraph>
      ) : mood ? (
        <div className="space-y-6">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Mood</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodUpdate
                  mood={mood}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-6xl">{getMoodEmoji(mood.mood)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold capitalize">
                        {mood.mood}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Created: {formatDate(mood.created_at)}
                    </div>
                    {mood.updated_at !== mood.created_at && (
                      <div className="text-sm text-gray-400">
                        Updated: {formatDate(mood.updated_at)}
                      </div>
                    )}
                  </div>
                </div>

                {mood.note && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Note:</h3>
                    <p className="text-gray-700">{mood.note}</p>
                  </div>
                )}

                <HGroupSM>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </HGroupSM>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Paragraph>Mood not found</Paragraph>
      )}
    </CenteredLayout>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
