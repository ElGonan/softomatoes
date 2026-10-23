"""
This is my first pong, well maybe not the first one i've built but yeah it's 
the first in a while and I want to remember how to do this

The source code is from geeks for geeks:
https://www.geeksforgeeks.org/python/create-a-pong-game-in-python-pygame/

However I took my liberties and made some modifications
"""

import pygame
import pygame_widgets
from pygame_widgets.button import Button

from ball import Ball
from paddle import Paddle

pygame.init()

FONT = pygame.font.Font('CaskaydiaMonoNerdFont-Italic.ttf', 20)

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
GRAY = (128, 128, 128)

WIDTH = 400
HEIGHT = 400

FPS = 45

VERSION = "0.0.0"


def _build_start():
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Pongg")

    clock = pygame.time.Clock()

    return screen, clock

# Now a simple menu
def _main_menu():
    screen, clock = _build_start()

    main_text = FONT.render("PONG", True, WHITE)
    main_text_rect = main_text.get_rect()
    main_text_rect.center = (WIDTH//2, HEIGHT//4)

    v_text = FONT.render(f"Made by ElGonan. v{VERSION}", True, GRAY)
    v_rect = v_text.get_rect()
    v_rect.center = (WIDTH//2, HEIGHT-20)



    play = Button(
        screen,
        WIDTH//4,
        HEIGHT//2,
        WIDTH//2,
        HEIGHT//6,
        text="Play!",
        fontSize=20,
        radius=20,
        onClick=lambda: _game(screen,clock)
    )

    running = True
    while running:
        events = pygame.event.get()
        for event in events:
            if event.type == pygame.QUIT:
                running = False

        screen.fill(BLACK)
        screen.blit(main_text, main_text_rect)
        screen.blit(v_text, v_rect)
        pygame_widgets.update(events)
        pygame.display.update()
        clock.tick(FPS)




# Game manager
def _game(screen, clock):
    running = True


    paddle1 = Paddle(20, HEIGHT//2, 10, 100, 20, GREEN, screen)
    paddle2 = Paddle(WIDTH - 30, HEIGHT//2, 10, 100, 20, GREEN, screen)
    ball = Ball(WIDTH//2, HEIGHT//2, 7, 7, WHITE, screen)

    list_of_paddles = [paddle1, paddle2]

    # Init params
    paddle1Score, paddle2Score = 0,0
    paddle1YFac, paddle2YFac = 0,0

    while running:
        screen.fill(BLACK)

        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    paddle2YFac = -1
                if event.key == pygame.K_DOWN:
                    paddle2YFac = 1
                if event.key == pygame.K_w:
                    paddle1YFac = -1
                if event.key == pygame.K_s:
                    paddle1YFac = 1
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                    paddle2YFac = 0
                if event.key == pygame.K_w or event.key == pygame.K_s:
                    paddle1YFac = 0

        # Detect collision
        for paddle in list_of_paddles:
            if pygame.Rect.colliderect(ball.getRect(), paddle.getRect()):
                ball.hit()

        # Update objects
        paddle1.update(paddle1YFac)
        paddle2.update(paddle2YFac)
        point = ball.update()

        """
         1 -> Paddle 1 scored
        -1 -> Paddle 2 scored
         0 -> No one has scored (yet)
        """

        if point == 1:
            paddle1Score += 1
        elif point == -1:
            paddle2Score += 1
            
        # If someone scored, reset
        if point:
            ball.reset()

        # display
        paddle1.display()
        paddle2.display()
        ball.display()

        # display the scores
        paddle1.displayScore(FONT, "Paddle 1: ", paddle1Score, 100, 20, WHITE)
        paddle2.displayScore(FONT, "Paddle 2: ", paddle2Score, WIDTH - 100, 20, WHITE)

        pygame.display.update()

        # now adjust framerate
        clock.tick(FPS)


def main():
    _main_menu()

if __name__ == "__main__":
    main()
    pygame.quit()
