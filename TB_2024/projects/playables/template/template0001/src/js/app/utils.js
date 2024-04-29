window.utils = {
    getBaseTexture: function(name) {
        if (!sprites[name]) {
            console.log(`"${name}" image not found!`);
            return;
        }

        if (!PIXI.utils.BaseTextureCache[name]) {
            //workaround for iOS 9
            let image = new Image();
            image.src = sprites[name].src;
            //--------------------
            PIXI.BaseTexture.addToCache(new PIXI.BaseTexture(image), name);
        }

        return PIXI.utils.BaseTextureCache[name];
    },

    getTexture: function(name) {
        if (PIXI.utils.TextureCache[name]) {
            return PIXI.utils.TextureCache[name];
        }

        let textureSheet = this.getTextureSheet(name);

        if (textureSheet) {
            PIXI.Texture.addToCache(textureSheet, name);

            return textureSheet;
        }

        if (!this.getBaseTexture(name)) {
            return;
        }

        let texture = new PIXI.Texture(this.getBaseTexture(name));

        let pic = sprites[name];
        texture.origWidth = (pic.w / pic.r);
        texture.origHeight = (pic.h / pic.r);

        PIXI.Texture.addToCache(texture, name);

        return texture;
    },

    getTextureSheet: function(name) {
        if (typeof spritesheets == "undefined") {
            return false;
        }
        let data = spritesheets[name];
        if (!data) {
            return false;
        }

        let srcBaseTexture = `spritesheet_${name.split("/")[0]}`;

        let baseTexture = this.getBaseTexture(srcBaseTexture);

        if (!baseTexture) { return; }


        let sourceSize = data.trimmed !== false && data.sourceSize
            ? data.sourceSize : data.frame;

        let rect = data.frame;

        let orig = new PIXI.Rectangle(
            0,
            0,
            sourceSize.w,
            sourceSize.h
        );

        let frame;
        if (data.rotated) {
            frame = new PIXI.Rectangle(
                rect.x,
                rect.y,
                rect.h,
                rect.w
            );
        } else {
            frame = new PIXI.Rectangle(
                rect.x,
                rect.y,
                rect.w,
                rect.h
            );
        }

        let trim = new PIXI.Rectangle(
            data.spriteSourceSize.x,
            data.spriteSourceSize.y,
            rect.w,
            rect.h
        );

        let texture = new PIXI.Texture(baseTexture, frame, orig, trim, data.rotated ? 2 : 0);

        texture.origWidth = data.sourceSize.w;
        texture.origHeight = data.sourceSize.h;

        return texture;
    }
};