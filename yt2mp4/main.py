import yt_dlp


def download_mp4(url: str):
    options = {
        # 'format': 'bestvideo+bestaudio/best',
        'format': 'b',
        # requires node installed
        'js_runtimes': {
            'node': {}
        },
        'outtmpl': '%(title)s.%(ext)s',
    }

    with yt_dlp.YoutubeDL(options) as ydl:
        ydl.download([url])



link = input("Ingresa la URL del video de YouTube: ")
download_mp4(link)
