namespace SpriteKind {
    export const speedboots = SpriteKind.create()
    export const jumpboots = SpriteKind.create()
    export const fireball = SpriteKind.create()
    export const heart = SpriteKind.create()
    export const coin = SpriteKind.create()
    export const plant = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = -160
        jump = true
    } else if (jump == true) {
        mySprite.vy = -160
        jump = false
        mySprite.startEffect(effects.coolRadial)
        scene.cameraShake(4, 200)
        pause(500)
        effects.clearParticles(mySprite)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(bat)
    if (mySprite.y < bat.y) {
        info.changeScoreBy(3)
    } else {
        statusbar.value += -20
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    level += 1
    level2()
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile4`)
    game.splash("You unlocked a new level!")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.clouds)
})
sprites.onCreated(SpriteKind.fireball, function (sprite) {
    sprite.setImage(img`
        . 4 . . . 4 . . . 4 . . . 4 . . 
        . 4 . . . . 4 . 4 . . 4 . . 4 . 
        . . 4 . 4 4 4 4 4 4 4 4 . . 4 . 
        . . . 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . . 4 4 4 4 2 4 4 4 4 4 4 . . 
        . . 4 4 2 4 4 4 4 4 5 4 4 4 4 . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
        . . 4 4 5 4 4 4 4 4 4 4 4 2 4 . 
        . . 4 4 4 4 4 5 4 4 2 4 4 4 4 . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
        . . 4 4 4 4 4 4 4 4 4 4 5 4 4 . 
        . . 4 4 4 2 4 4 4 4 4 4 4 4 4 . 
        . . . 4 4 4 4 4 4 5 4 4 4 4 . . 
        . . . . 4 4 2 4 4 4 4 4 4 . . . 
        . . . . . 4 4 4 4 4 4 4 . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    sprite.startEffect(effects.fire)
    animation.runMovementAnimation(
    sprite,
    "c 0 -100 0 100 0 0",
    3000,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    if (statusbar.value == 100) {
        info.changeScoreBy(10)
        sprites.destroy(otherSprite)
    } else {
        statusbar.value += 20
        sprites.destroy(otherSprite)
    }
})
function cover_tiles_and_spawn_entitys () {
    tiles.coverAllTiles(assets.tile`myTile4`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile5`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile3`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile1`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile12`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile13`, assets.tile`myTile17`)
    tiles.coverAllTiles(assets.tile`myTile15`, assets.tile`myTile17`)
    tiles.createSpritesOnTiles(assets.tile`myTile13`, SpriteKind.speedboots)
    tiles.createSpritesOnTiles(assets.tile`myTile12`, SpriteKind.fireball)
    tiles.createSpritesOnTiles(assets.tile`myTile5`, SpriteKind.plant)
    tiles.createSpritesOnTiles(assets.tile`myTile3`, SpriteKind.coin)
    tiles.createSpritesOnTiles(assets.tile`myTile15`, SpriteKind.jumpboots)
    tiles.createSpritesOnTiles(assets.tile`myTile1`, SpriteKind.heart)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = jumphieght
        jump = true
    } else if (jump == true) {
        mySprite.vy = -160
        jump = false
        mySprite.startEffect(effects.coolRadial)
        scene.cameraShake(4, 200)
        pause(500)
        effects.clearParticles(mySprite)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.jumpboots, function (sprite, otherSprite) {
    jumphieght = -300
})
sprites.onCreated(SpriteKind.plant, function (sprite) {
    sprite.setImage(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . b b d d b b . 
        b 1 1 3 3 1 1 b 
        b 1 3 5 5 3 1 b 
        b d 3 5 5 3 d b 
        c 1 1 d d 1 1 c 
        c d 1 d d 1 d c 
        . c c 7 6 c c . 
        . . 6 7 6 . . . 
        . . 6 6 8 8 8 6 
        . . 6 8 7 7 7 6 
        . . 8 7 7 7 6 . 
        . . 8 8 8 6 . . 
        `)
})
function level2 () {
    if (level == 0) {
        tiles.setCurrentTilemap(tilemap`level3`)
        scene.setBackgroundColor(9)
    } else if (level == 1) {
        tiles.setCurrentTilemap(tilemap`level4`)
        scene.setBackgroundColor(9)
    } else if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level5`)
        scene.setBackgroundColor(9)
    } else if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level2`)
        scene.setBackgroundColor(9)
    } else if (level == 4) {
        tiles.setCurrentTilemap(tilemap`level6`)
        scene.setBackgroundColor(9)
    } else if (level == 5) {
        tiles.setCurrentTilemap(tilemap`level7`)
        boss_fight2()
        scene.setBackgroundColor(11)
    } else if (level == 6) {
        tiles.setCurrentTilemap(tilemap`level8`)
        scene.setBackgroundColor(9)
    } else if (level == 7) {
        tiles.setCurrentTilemap(tilemap`level9`)
        scene.setBackgroundColor(9)
        mySprite.setImage(img`
            ................
            ................
            ................
            .....2222222....
            ....2222222222..
            ....fff44444....
            ...f4f4444f4....
            ...f4ff444f444..
            ....f444444f444.
            .....44444ffff..
            .....4444444....
            ....228222822...
            ...22282228222..
            ..2222888882222.
            ..4428588858244.
            ..4448888888444.
            ..4488888888844.
            ....888...888...
            ...fff.....fff..
            ..ffff.....ffff.
            `)
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`level10`)
        scene.setBackgroundColor(9)
        mySprite.setImage(img`
            ........8...........
            ........888....8....
            ........888....8....
            .....888.8888888....
            ......8888881181....
            ......8888881787....
            .......888881111....
            .....88888844444f...
            .....8888844f444....
            ......8888444ff4....
            .......888444444....
            ........88888888....
            ......448844448844..
            .....44488444488444.
            .....44.88444488.44.
            .....dd.88444488.44.
            .....dd.88444488.dd.
            ........88888888.dd.
            ........88....88....
            ........88....88....
            ........88....88....
            ........88....88....
            ........88....88....
            ........2252..2252..
            ........2252..2252..
            `)
    } else {
        game.gameOver(true)
        game.setGameOverEffect(true, effects.confetti)
    }
    cover_tiles_and_spawn_entitys()
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
    game.setGameOverMessage(false, "GAME OVER!")
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.clouds)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onCreated(SpriteKind.coin, function (sprite) {
    sprite.setImage(img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `)
    animation.runImageAnimation(
    sprite,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
})
sprites.onCreated(SpriteKind.speedboots, function (sprite) {
    sprite.setImage(img`
        ......................
        ......................
        ......................
        ......................
        ......................
        ......................
        ....6666.......6666...
        ....8888.......8888...
        ....6666.......6666...
        ....8888.5.....8888.5.
        ...888885.5...888885.5
        ..888855.5...888855.5.
        .88888855...88888855..
        .6666666....6666666...
        ......................
        ......................
        `)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.plant, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    bat = sprites.create(img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c . . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f b 3 b c 3 b c f b b c c c . 
        . c b b b b b b c f b c b c c . 
        . c b b b b b b c b b c b b c . 
        c b 1 b b b 1 b b b c c c b c . 
        c b b b b b b b b c c c c c . . 
        f b c b b b c b b b b f c . . . 
        f b 1 f f f 1 b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    bat,
    [img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c . . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f b 3 b c 3 b c f b b c c c . 
        . c b b b b b b c f b c b c c . 
        . c b b b b b b c b b c b b c . 
        c b 1 b b b 1 b b b c c c b c . 
        c b b b b b b b b c c c c c . . 
        f b c b b b c b b b b f c . . . 
        f b 1 f f f 1 b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . c c . . c c . . . . . . . . 
        . . c 3 c c 3 c c c . . . . . . 
        . c b 3 b c 3 b c c c . . . . . 
        . c b b b b b b b b f f . . . . 
        c c b b b b b b b b f f . . . . 
        c b 1 b b b 1 b b c f f f . . . 
        c b b b b b b b b f f f f . . . 
        f b c b b b c b c c b b b . . . 
        f b 1 f f f 1 b f c c c c . . . 
        . f b b b b b b f b b c c . . . 
        c c f b b b b b c c b b c . . . 
        c c c f f f f f f c c b b c . . 
        . c c c . . . . . . c c c c c . 
        . . c c c . . . . . . . c c c c 
        . . . . . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        f f c . . . . . . . f c b b c . 
        f c c . . . . . . f c b b c . . 
        c f . . . . . . . f b c c c . . 
        c f f . . . . . f f b b c c . . 
        f f f c c . c c f b c b b c . . 
        f f f c c c c c f b c c b c . . 
        . f c 3 c c 3 b c b c c c . . . 
        . c b 3 b c 3 b b c c c c . . . 
        c c b b b b b b b b c c . . . . 
        c b 1 b b b 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        f b c b b b c b b b b f . . . . 
        . f 1 f f f 1 b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `],
    100,
    true
    )
    bat.setPosition(mySprite.x + 80, mySprite.y - 80)
    bat.follow(mySprite)
})
sprites.onCreated(SpriteKind.heart, function (sprite) {
    sprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 . . . . . . 2 2 2 . . 
        . 2 2 2 2 2 . . . . 2 2 2 2 2 . 
        2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
        2 2 2 f 2 2 2 2 2 2 2 2 f 2 2 2 
        2 2 2 f 2 2 2 2 2 2 2 2 f 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 f 2 2 2 2 2 2 2 2 2 2 2 2 f 2 
        2 f 2 2 2 2 2 2 2 2 2 2 2 2 f 2 
        2 2 f 2 2 2 2 2 2 2 2 2 2 f 2 2 
        2 2 f 2 2 2 2 2 2 2 2 2 2 f 2 2 
        . 2 2 f f f f 2 2 f f f f 2 2 . 
        . . 2 2 2 2 2 f f 2 2 2 2 2 . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        `)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.fireball, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    statusbar.value += -40
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.speedboots, function (sprite, otherSprite) {
    controller.moveSprite(sprite, 0, 500)
})
function boss_fight2 () {
    scene.setBackgroundColor(12)
    bossg = sprites.create(img`
        ........................
        ............cc..........
        ............ccc.........
        ........ccc.ccccccc.....
        ........ccccc555555cc...
        ........ccb5555555555c..
        .....ccc.b55555ff15555c.
        .....cccb5555555ff55555c
        ......cb555555555555d55c
        ....c.b555555555bb55555c
        ....ccb555ddd5555b13bbc.
        ....ccd55ddddd555b3335c.
        .....cdd5ddddddd55b335c.
        ...c.bddddb555bbbd555c..
        ...ccdddddb555555bccc...
        ..cccddddddcc5555bcc....
        .cdccddddddddbcccbcccc..
        .cddbdddddddddbbbbc55c..
        .cdddddddddd55dbbbc5c...
        .cbddddbbbbd55ddbccc....
        ..cbdddbbbbd555dccc.....
        ...cccbbbbbbddd555c.....
        .....ccccccbd55555c.....
        ...........cc5555c......
        `, SpriteKind.Player)
    bossg.changeScale(1.5, ScaleAnchor.Middle)
    bossg.ay = 355
    tiles.placeOnTile(bossg, tiles.getTileLocation(15, 12))
    statusbar2 = statusbars.create(140, 10, StatusBarKind.EnemyHealth)
    statusbar2.positionDirection(CollisionDirection.Bottom)
    statusbar2.setOffsetPadding(0, 5)
    statusbar2.setColor(2, 12, 5)
    statusbar2.setBarBorder(2, 15)
    statusbar2.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    bossalive = true
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    jumphieght = -160
    controller.moveSprite(mySprite, 100, 0)
})
sprites.onCreated(SpriteKind.jumpboots, function (sprite) {
    sprite.setImage(img`
        ......................
        ......................
        ......................
        ......................
        ......................
        ......................
        ......7777......7777..
        ......4444......4444..
        ......7777......7777..
        ......4444......4444..
        .....44744.d...44744.d
        ....444444d...444444d.
        ...444444dd..444444dd.
        ...7777777...7777777..
        ......................
        ......................
        `)
})
let bossalive = false
let statusbar2: StatusBarSprite = null
let bossg: Sprite = null
let bat: Sprite = null
let jump = false
let level = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let jumphieght = 0
jumphieght = -160
mySprite = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.value = 100
mySprite.ay = 350
level = 0
controller.moveSprite(mySprite, 100, 0)
level2()
tiles.placeOnRandomTile(mySprite, assets.tile`myTile4`)
scene.cameraFollowSprite(mySprite)
statusbar.attachToSprite(mySprite)
statusbar.setColor(7, 2, 5)
statusbar.setBarBorder(1, 15)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
game.onUpdate(function () {
    if (level != 7) {
        if (mySprite.isHittingTile(CollisionDirection.Right) && mySprite.vy >= 0) {
            mySprite.vy = 0
            mySprite.ay = 0
            mySprite.setImage(img`
                . . . . . f f . . . . . . . . . 
                . . . . f f f f . . . . . . . . 
                . . . f f c f f f f . . . f f . 
                . . f f f c f f f f f f f f f f 
                . f f f c f f e e 4 4 f 7 6 f f 
                . f f c f f e e e 4 4 e 7 6 f f 
                . f f f f f f f f f 4 e e f f . 
                . f f f f c f f b 1 e 4 4 e f . 
                . f f f c c f f f e e 4 4 e f . 
                . f f f f f f f e 4 f e e f f f 
                . . f f f f c f e e f f f f f f 
                . . f f f c c f f f f . . f f . 
                . . . . f f f f f . . . . . . . 
                `)
        } else if (mySprite.isHittingTile(CollisionDirection.Left) && mySprite.vy >= 0) {
            mySprite.vy = 0
            mySprite.ay = 0
            mySprite.setImage(img`
                . . . . . . . . . f f . . . . . 
                . . . . . . . f f f f f . . . . 
                . f f . . . f f f f c f f . . . 
                f f f f f f f f f f c f f f . . 
                f f 6 7 f 4 4 e e f f c f f f . 
                f f 6 7 e 4 4 e e e f f c f f . 
                . f 6 7 e 4 f f f f f f f f f . 
                . f 6 7 e 4 1 b f f c f f f f . 
                . f f e e e e f f f c c f f f . 
                f f e 4 4 f 4 e f f f f f f f . 
                f f e 4 4 f e e f c f f f f . . 
                . f f e 4 f f f f c c f f f . . 
                . . . . . . f f f f f f . . . . 
                `)
        } else {
            mySprite.ay = 350
        }
    }
})
game.onUpdate(function () {
    if (bossalive == true) {
        if (mySprite.x + 30 < bossg.x) {
            bossg.vx = -20
            bossg.setImage(img`
                ........................
                ..........cc............
                .........ccc............
                .....ccccccc.ccc........
                ...cc555555ccccc........
                ..c5555555555bcc........
                .c55551ff55555b.ccc.....
                c55555ff5555555bccc.....
                c55d555555555555bc......
                c55555bb555555555b.c....
                .cbb31b5555ddd555bcc....
                .c5333b555ddddd55dcc....
                .c533b55ddddddd5ddc.....
                ..c555dbbb555bddddb.c...
                ...cccb555555bdddddcc...
                ....ccb5555ccddddddccc..
                ..ccccbcccbddddddddccdc.
                ..c55cbbbbdddddddddbddc.
                ...c5cbbbd55ddddddddddc.
                ....cccbdd55dbbbbddddbc.
                .....cccd555dbbbbdddbc..
                .....c555dddbbbbbbccc...
                .....c55555dbcccccc.....
                ......c5555cc...........
                `)
        } else if (mySprite.x - 30 > bossg.x) {
            bossg.vx = 20
            bossg.setImage(img`
                ........................
                ............cc..........
                ............ccc.........
                ........ccc.ccccccc.....
                ........ccccc555555cc...
                ........ccb5555555555c..
                .....ccc.b55555ff15555c.
                .....cccb5555555ff55555c
                ......cb555555555555d55c
                ....c.b555555555bb55555c
                ....ccb555ddd5555b13bbc.
                ....ccd55ddddd555b3335c.
                .....cdd5ddddddd55b335c.
                ...c.bddddb555bbbd555c..
                ...ccdddddb555555bccc...
                ..cccddddddcc5555bcc....
                .cdccddddddddbcccbcccc..
                .cddbdddddddddbbbbc55c..
                .cdddddddddd55dbbbc5c...
                .cbddddbbbbd55ddbccc....
                ..cbdddbbbbd555dccc.....
                ...cccbbbbbbddd555c.....
                .....ccccccbd55555c.....
                ...........cc5555c......
                `)
        } else {
            bossg.vx = 0
        }
    }
})
forever(function () {
    if (level == 7) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................
            ................
            ................
            ....2222222.....
            ...222222222....
            ...fff444f4.....
            ..f4f4444f44....
            ..f4f44444f44...
            ...f4444ffff....
            ....444444......
            ...22822822.....
            ..2228228222....
            ..4428228244....
            ..4448888444....
            ..4485885844....
            ....88888888....
            ...8888..888....
            ...888....fff...
            ..fff.....ffff..
            .ffff...........
            `,img`
            ................
            ................
            ................
            ...2222222......
            ..222222222.....
            ..fff444f4......
            .f4f4444f44.....
            .f4f44444f44....
            ..f4444ffff.44..
            ...444444.2244..
            ..22822822224...
            .2228228222.....
            422..8228.......
            44...8888.......
            ....858858......
            ....888888......
            ..888888888.....
            .fff....888.....
            ffff.....fff....
            .........ffff...
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................
            ................
            ................
            .....2222222....
            ....222222222...
            .....4f444fff...
            ....44f4444f4f..
            ...44f44444f4f..
            ....ffff4444f...
            ......444444....
            .....22822822...
            ....2228228222..
            ....4428228244..
            ....4448888444..
            ....4485885844..
            ....88888888....
            ....888..8888...
            ...fff....888...
            ..ffff.....fff..
            ...........ffff.
            `,img`
            ................
            ................
            ................
            ......2222222...
            .....222222222..
            ......4f444fff..
            .....44f4444f4f.
            ....44f44444f4f.
            ..44.ffff4444f..
            ..4422.444444...
            ...42222822822..
            .....2228228222.
            .......8228..224
            .......8888...44
            ......858858....
            ......888888....
            .....888888888..
            .....888....fff.
            ....fff.....ffff
            ...ffff.........
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    } else if (level == 8) {
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`myAnim2`,
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`myAnim3`,
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    } else {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f f . 
            f f e 4 e 1 f 4 4 f f . . 
            . f f f e 4 4 4 4 f . . . 
            . 4 4 4 e e e e f f . . . 
            . e 4 4 e 7 7 7 7 f . . . 
            . f e e f 6 6 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f f . . 
            . f f f e e 4 4 4 f . . . 
            . . f e 4 4 e e f f . . . 
            . . f e 4 4 e 7 7 f . . . 
            . f f f e e f 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . f f f f f . . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f . . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f . . . 
            . f f f e 4 4 4 4 f . . . 
            . . f e e e e e f f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . f e e f 6 6 6 f . . . 
            . . . f f f f f f . . . . 
            . . . . f f f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . . f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . . f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e e f . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 6 6 6 f e e f . . 
            . . . . f f f f f f . . . 
            . . . . . . f f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 e e f f f . 
            . . . f f e e 4 4 e f . . 
            . . . f 7 7 e 4 4 e f . . 
            . . f f 6 6 f e e f f f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . f f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f f 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e 4 4 4 . 
            . . . f 7 7 7 7 e 4 4 e . 
            . . f f 6 6 6 6 f e e f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    }
})
