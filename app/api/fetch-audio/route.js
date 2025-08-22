// route example: http://localhost:3000/api/fetch-audio?songCID=125054
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const songCID = searchParams.get("songCID");

    if (!songCID) {
        return new Response(null, { status: 400 });
    }

    try {
        const response = await fetch("https://monster-siren.hypergryph.com/api/song/" + songCID);

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