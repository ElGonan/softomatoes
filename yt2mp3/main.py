import yt_dlp

def download_mp3(url: str):
    options = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': '%(title)s.%(ext)s',
    }

    with yt_dlp.YoutubeDL(options) as ydl:
        ydl.download([url])



link = input("Ingresa la URL del video de YouTube: ")
download_mp3(link)
