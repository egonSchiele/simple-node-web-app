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

export async function apiMoodsPost(options:Record<string, any> = {}): Promise<any> {
    const response = await fetch(`/api/moods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
    });
    if (!response.ok) {
        console.log(`Error calling API apiMoodsPost`);
    }
    return response.json();
}

export async function apiMoodsIdDelete(id: string | number, options:Record<string, any> = {}): Promise<any> {
    const response = await fetch(`/api/moods/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
    });
    if (!response.ok) {
        console.log(`Error calling API apiMoodsIdDelete`);
    }
    return response.json();
}

export async function apiMoodsIdGet(id: string | number, options:Record<string, any> = {}): Promise<any> {
    const response = await fetch(`/api/moods/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
    });
    if (!response.ok) {
        console.log(`Error calling API apiMoodsIdGet`);
    }
    return response.json();
}

export async function apiMoodsIdPut(id: string | number, options:Record<string, any> = {}): Promise<any> {
    const response = await fetch(`/api/moods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
    });
    if (!response.ok) {
        console.log(`Error calling API apiMoodsIdPut`);
    }
    return response.json();
}

