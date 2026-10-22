# The ball for the pong game 

import pygame

class Ball():
    def __init__(self, posx, posy, radius, speed, color, screen):
        self.posx = posx
        self.posy = posy
        self.radius = radius
        self.speed = speed
        self.color = color
        self.xFac = 1
        self.yFac = -1
        self.ball = pygame.draw.circle(screen, self.color, 
                                       (self.posx, self.posy), self.radius)
        self.firstTime = 1
        self.screen = screen

    def display(self):
        self.ball = pygame.draw.circle(self.screen, self.color, 
                                       (self.posx, self.posy), self.radius)

    def update(self):
        self.posx += self.speed * self.xFac
        self.posy += self.speed * self.yFac
        
        # If the ball hits top or bottom, reflect the trajectory
        if self.posy <= 0 or self.posy >= self.screen.height:
            self.yFac *= -1

        # If the ball touches left side of the screen, we set the score!
        if self.posx <= 0 and self.firstTime:
            self.firstTime = 0
            return 1
        elif self.posx >= self.screen.width and self.firstTime:
            self.firstTime = 0
            return -1
        else:
            return 0


    # Reset the ball position
    def reset(self):
        self.posx = self.screen.height//2
        self.posy = self.screen.width//2
        self.xFac *= -1
        self.firstTime = 1

    # Reflect the ball along the x-axis
    def hit(self):
        self.xFac *= -1

    def getRect(self):
        return self.ball
