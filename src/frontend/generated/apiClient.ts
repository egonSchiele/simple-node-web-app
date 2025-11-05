// Auto-generated API client

import type { ApiMoodsResponseGet, ApiMoodsResponsePost, ApiMoodResponseGet, ApiMoodsResponsePut } from "/Users/adit/simple-node-web-app/src/common/apiTypes.js"

export async function apiMoodsGet(options:Record<string, any> = {}): Promise<ApiMoodsResponseGet> {
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

export async function apiMoodsPost(options:Record<string, any> = {}): Promise<ApiMoodsResponsePost> {
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

export async function apiMoodsIdGet(id: string | number, options:Record<string, any> = {}): Promise<ApiMoodResponseGet> {
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

export async function apiMoodsIdPut(id: string | number, options:Record<string, any> = {}): Promise<ApiMoodsResponsePut> {
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

