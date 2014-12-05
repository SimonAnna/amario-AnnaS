
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 128)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);

        this.renderable.setCurrentAnimation("idle");

        this.body.setVelocity(5, 20);
    },
    update: function(delta) {


        if (me.input.isKeyPressed("right")) {
             this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed("left")){
             this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;  
        }
        else {
            this.body.vel.x = 0;
        }
    

        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);


        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        console.log(this.body.vel.x);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {

    }

});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
        console.log("init");
    },
    onCollision: function() {
        console.log("collision");
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }

});

   game.BadGuy = me.Entity.extend({
      init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 128)).toPolygon();
                }
            }]);

    },
    update: function(delta) {
        
    }
    
});