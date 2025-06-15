// Auto-generated API client

export async function apiMoodsGet(options:Record<string, any> = {}): Promise<any> {
    const response = await fetch(`/api/moods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
    });
    if (!response.ok) {
        console.log(`Error calling API apiMoodsGet`);
    }
    return response.json();
}

