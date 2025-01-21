# ======================================
# Pomodoro timer
# Author: ElGonan
# ver. 1.3
# ======================================
# Softomatoes 2025
# ======================================

# Important note
# Right now, the app is only fully functional on MacOS. It partially works on
# Linux and i have no idea on windows.

import os
import sys
import time
import platform
import threading
from tkinter import *
from tkinter import ttk
from PIL import Image, ImageTk
from plyer import notification
from playsound import playsound

# Global var for stopping the timer
stop_timer = threading.Event()

# Resource path
def resource_path(relative_path):
    # Get the base path for the resources
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)


# Notification
def notif(title, message):
    system = platform.system()
    if system == "Darwin":
        icon_path = resource_path("misc/logo.icns")
    else:
        icon_path = resource_path("misc/logo.png")
    notification.notify(
        title=title,
        message=message,
        app_icon=icon_path,
        timeout=6
    )
    try:
        sound_path = resource_path("misc/alarm.wav")
        if os.path.exists(sound_path):
            os.system(f"afplay {sound_path}")
            print("Alarm played successfully!")
        else:
            print(f"Sound file not found: {sound_path}")
            # execution using playsound
    except:
        playsound(resource_path("misc/alarm.wav"))

# Temporizer
def timer(value):
    global stop_timer
    while value > 0 and not stop_timer.is_set():
        mins, secs = divmod(value, 60)
        timer_label.config(text=f"{mins:02}:{secs:02}")
        root.update()
        time.sleep(1)
        value -= 1
    if stop_timer.is_set():  # Check if the timer was stopped
        timer_label.config(text="00:00")

# Start the timer
def start_timer(work, sbreak, lbreak, sesh):
    global stop_timer
    stop_timer.clear()  # Clear the flag to start the timer
    def run_timer():
        for session in range(1, sesh + 1):
            if stop_timer.is_set():
                return
            update_status(f"Work session {session}/{sesh}")
            timer(work * 60)
            if stop_timer.is_set():
                return
            notif("Pomodoro", "Time for a short break!")
            update_status("Short break")
            timer(sbreak * 60)

        if not stop_timer.is_set():
            update_status("Long break")
            notif("Pomodoro", "Time for a long break!")
            timer(lbreak * 60)

        if not stop_timer.is_set():
            update_status("Pomodoro cycle complete!")

    # Run the timer in a separate thread
    threading.Thread(target=run_timer, daemon=True).start()

# Start the app
def start_pomodoro():
    try:
        work = int(work_entry.get())
        sbreak = int(short_break_entry.get())
        lbreak = int(long_break_entry.get())
        sesh = int(sessions_entry.get())
    except ValueError:
        update_status("Please enter valid values")
    else:
        start_timer(work, sbreak, lbreak, sesh)
        start_button.config(state="disabled")
        stop_button.config(state="normal")

# Stop the timer
def stop_pomodoro():
    global stop_timer
    stop_timer.set()  # Set the flag to stop the timer
    timer_label.config(text="00:00")
    status_label.config(text="Pomodoro stopped.")
    start_button.config(state="normal")
    stop_button.config(state="disabled")

# Update the status
def update_status(message):
    status_label.config(text=message)

## GUI

# Main window
root = Tk()
root.title("Pomodoro Timer")
root.geometry("400x400")

# Load icon image
icon_path = resource_path("misc/logo.png")
image = Image.open(icon_path)
icon = ImageTk.PhotoImage(image)
root.iconphoto(False, icon)

# Load the background image
bg = Image.open(resource_path("misc/logo.png"))
bg = bg.resize((400, 400), Image.Resampling.LANCZOS)
bg_photo = ImageTk.PhotoImage(bg)

# Create a canvas
canvas = Canvas(root, width=500, height=400)
canvas.pack(fill="both", expand=True)
canvas.create_image(0, 0, image=bg_photo, anchor="nw")

# Create the widgets
canvas.create_text(200, 50, text="POMODORO TIMER", font=("Helvetica", 20, "bold"), fill="white")

canvas.create_text(100, 100, text="Work session duration (min):", font=("Helvetica", 12), fill="white")
work_entry = Entry(root)
work_entry.insert(0, "25")
canvas.create_window(300, 100, window=work_entry)

canvas.create_text(100, 150, text="Short break duration (min):", font=("Helvetica", 12), fill="white")
short_break_entry = Entry(root)
short_break_entry.insert(0, "5")
canvas.create_window(300, 150, window=short_break_entry)

canvas.create_text(100, 200, text="Long break duration (min):", font=("Helvetica", 12), fill="white")
long_break_entry = Entry(root)
long_break_entry.insert(0, "15")
canvas.create_window(300, 200, window=long_break_entry)

canvas.create_text(100, 250, text="Number of work sessions:", font=("Helvetica", 12), fill="white")
sessions_entry = Entry(root)
sessions_entry.insert(0, "4")
canvas.create_window(300, 250, window=sessions_entry)

# Start button
start_button = Button(root, text="Start Pomodoro", command=start_pomodoro, bg="green", fg="black")
canvas.create_window(150, 300, window=start_button)

# Stop button
stop_button = Button(root, text="Stop", command=stop_pomodoro, bg="red", fg="black", state="disabled")
canvas.create_window(250, 300, window=stop_button)

# Status label
status_label = Label(root, text="Pomodoro Timer", font=("Helvetica", 12), fg="white")
canvas.create_window(200, 330, window=status_label)

# Timer label
timer_label = Label(root, text="00:00", font=("Helvetica", 20), fg="white")
canvas.create_window(200, 380, window=timer_label)

# Softomatoes label
softomatoes_label = Label(root, text="Softomatoes", font=("Helvetica", 10), fg="white")
canvas.create_window(335, 380, window=softomatoes_label)

root.mainloop()
