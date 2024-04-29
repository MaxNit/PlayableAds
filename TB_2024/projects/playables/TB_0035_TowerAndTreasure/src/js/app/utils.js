window.utils = {
    getBaseTexture: function (name) {
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

    getTexture: function (name) {
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

    getTextureSheet: function (name) {
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
    },

    merge: function(obj1, obj2) {
        const mergedObject = {};
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i];
            mergedObject[key] = obj1[key];
        }

        for (let i = 0; i < keys2.length; i++) {
            const key = keys2[i];
            mergedObject[key] = obj2[key];
        }

        return mergedObject;
    },

    getRandomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomElement: function(array) {
        return array[utils.getRandomNumber(0, array.length - 1)];
    },

    distanceBetweenPoints: function(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceBetweenSprites: function(sprite1, sprite2) {
        const globalPoint1 = utils.getGlobalPosition(sprite1);
        const globalPoint2 = utils.getGlobalPosition(sprite2);

        return utils.distanceBetweenPoints(globalPoint1, globalPoint2);
    },

    getGlobalPosition: function(sprite) {
        const position = new PIXI.Point();
        sprite.getGlobalPosition(position);

        return position;
    },

    shuffle: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};