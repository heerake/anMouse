window.anMouse = (function(){
    function Vector(x, y){
        if(!(this instanceof Vector))
            return new Vector(x, y);
        this.x = x || 0;
        this.y = y || 0;
    }

    Vector.initByPoints = function(startPoint, endPoint){
        if(!startPoint) return Vector();
        if(!endPoint) return Vector(startPoint.x, startPoint.y);
        return Vector(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
    }  

    var degrees = 180 / Math.PI;

    Vector.prototype.horizontalAngel = function(){
        return Math.atan2(this.y, this.x);
    }
    Vector.prototype.horizontalAngelDeg = function(){
        return radian2degrees(this.horizontalAngel());
    }
    function radian2degrees (rad) {
        return rad * degrees;
    }
    Vector.prototype.length = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Vector.prototype.toString = function(){
        return '{x:' + this.x + ', y:' + this.y + '}';
    }

    var local = {},
        defaultOption = {
            maxLength: 3
        },
        self = {
            init: function(option){
                local.option = option || defaultOption;
                local.option.maxLength = (local.option.maxLength || defaultOption.maxLength);
                if(local.option.id)
                    local.area = document.getElementById(local.option.id);
                else
                    local.area = document;
                local.points = [];

                self.onMouseMoveEvent();
            },
            onMouseMoveEvent: function(){
                self.offMouseMoveEvent();
                if(local.area.addEventListener)
                    local.area.addEventListener('mousemove', self.savePoint);
                else
                    local.area.attachEvent('onmousemove', self.savePoint);
            },
            offMouseMoveEvent: function(){
                if(local.area.removeEventListener)
                    local.area.removeEventListener('mousemove', self.savePoint);     
                else
                    local.area.detachEvent('onmousemove', self.savePoint);
            },
            savePoint: function(e){
                //IE下会存e的引用, 所以这里直接取出需要的数据新建个对象保存
                var e = {x: e.clientX, y: -e.clientY, t: e.timeStamp};

                while(local.points.length >= local.option.maxLength){
                     local.points.shift();
                }
                local.points.push(e);
            },
            getData: function(){
                return local.points;
            },
            clear: function(){
                local.points = [];
            },
            getFullVector: function(){
                return Vector.initByPoints(self.getStartPoint(), self.getEndPoint());
            },
            getHorizontalAngel: function(){
                return self.getFullVector().horizontalAngel();
            },
            getHorizontalAngelDeg: function(){
                return self.getFullVector().horizontalAngelDeg();
            },
            getStartPoint: function(){
                return local.points[0];
            },
            getEndPoint: function(){
                return local.points[local.points.length-1];
            }
        };

    return self;
})()