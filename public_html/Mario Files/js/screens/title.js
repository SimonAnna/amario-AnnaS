//title screen
game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //what happens when you reset
    onResetEvent: function() {
        var titleImage = new me.Sprite(0, 0, me.loader.getImage("title"));
        me.game.world.addChild(titleImage, -10);
        me.input.bindKey(me.input.KEY.ENTER, "start");
    //respawn
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.Font("Comic Sans MS", 60, "red");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), " LEGEND OF SUPER SANIC BROS.", 20, 130);
                this.font.draw(renderer.getContext(), "WORLD 64 FOR SEGA GENISIS", 20, 200);
                this.font.draw(renderer.getContext(), "*NOW WITH IMORTAL COMBAT*", 20, 400);
                this.font.draw(renderer.getContext(), "Press ENTER to begin", 250, 530);
            }
        })));


        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "start") {
                me.state.change(me.state.PLAY);
            }
        });
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //when you die/start
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        //this.event.unsubscribe(this.handler);
    }
});
