# The paddle for the pong game

import pygame

class Paddle():
    def __init__(self, posx, posy, width, height, speed, color, screen):
        self.posx = posx
        self.posy = posy
        self.width = width
        self.height = height
        self.speed = speed
        self.color = color
        self.screen = screen

        #Rect that is used to control the position and collision
        self.paddleRect = pygame.Rect(posx, posy, width, height)

        # Object on screen
        self.paddle = pygame.draw.rect(self.screen, self.color, self.paddleRect)

    # display the object onscreen
    def display(self):
        self.paddle = pygame.draw.rect(self.screen, self.color, self.paddleRect)

    # update the state
    def update(self, yFac, ):
        """
        yFac == 1 -> Going downwards
        yFac == -1 -> Going upwards
        yFac == 0 -> Not moving
        """
        self.posy = self.posy + self.speed*yFac

        # Restrict paddle to screensize
        if self.posy <= 0:
            self.posy = 0
        elif self.posy + self.height >= self.screen.height:
            self.posy = self.screen.height - self.height

        # update drawing with new values
        self.paddleRect = (self.posx, self.posy, self.width, self.height)

    # render score onscreen
    def displayScore(self, font, text, score, x, y, color):
        text = font.render(text+str(score), True, color)

        textRect = text.get_rect()
        textRect.center = (x, y)

        self.screen.blit(text, textRect)

    def getRect(self):
        return self.paddleRect
