// https://web.hycdn.cn/siren/pic/20250724/0ed6044d7c5953179968a7762f7bcb64.png
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const albumLink = searchParams.get("albumLink");

    if (!albumLink) {
        return new Response(null, { status: 400 });
    }

    try {
        const response = await fetch(albumLink);

        if (response.ok) {
            return new Response(response.body, { status: 200 });
        }
        else {
            return new Response(null, { status: response.status });
        }
    }
    catch (e) {
        console.error(e);
        return new Response(null, { status: 500 });
    }
}