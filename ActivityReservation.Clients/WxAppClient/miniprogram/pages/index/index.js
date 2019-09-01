"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReservationService_1 = require("../../services/ReservationService");
var app = getApp();
var reservationSvc = new ReservationService_1.ReservationService();
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        pageNum: 1,
        pageSize: 8,
        totalPage: 1,
        totalCount: -1,
        reservations: []
    },
    onLoad: function () {
        console.log("onLoad");
    },
    onShow: function () {
        console.log("onShow");
        this.loadReservation(1, this.data.pageSize);
    },
    prevPage: function () {
        this.loadReservation(--this.data.pageNum, this.data.pageSize);
    },
    nextPage: function () {
        this.loadReservation(++this.data.pageNum, this.data.pageSize);
    },
    loadReservation: function (pageNum, pageSize) {
        var _this = this;
        if (pageSize === void 0) { pageSize = 10; }
        reservationSvc.Get(function (result) {
            console.log(result);
            _this.setData({
                pageNum: result.PageNumber,
                pageSize: result.PageSize,
                totalPage: result.PageCount,
                totalCount: result.TotalCount,
                reservations: result.Data
            });
        }, {
            pageNumber: pageNum,
            pageSize: pageSize
        });
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHdFQUF1RTtBQUV2RSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUM1QixJQUFNLGNBQWMsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLEVBQUU7UUFDWixXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxDQUFDO1FBQ1gsU0FBUyxFQUFFLENBQUM7UUFDWixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2QsWUFBWSxFQUFFLEVBQXdCO0tBQ3ZDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUE0QnhCLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZUFBZSxFQUFmLFVBQWdCLE9BQWMsRUFBRSxRQUFvQjtRQUFwRCxpQkFjQztRQWQrQix5QkFBQSxFQUFBLGFBQW9CO1FBQ2xELGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNsQixPQUFPLEVBQUUsTUFBTSxDQUFDLFVBQVU7Z0JBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtnQkFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUMzQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7Z0JBQzdCLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSTthQUMxQixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUU7WUFDRCxVQUFVLEVBQUUsT0FBTztZQUNuQixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksQ0FBTTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW5kZXguanNcclxuLy/ojrflj5blupTnlKjlrp7kvotcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJztcclxuaW1wb3J0IHsgUmVzZXJ2YXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvUmVzZXJ2YXRpb24nO1xyXG5pbXBvcnQgeyBSZXNlcnZhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9SZXNlcnZhdGlvblNlcnZpY2UnO1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5jb25zdCByZXNlcnZhdGlvblN2YyA9IG5ldyBSZXNlcnZhdGlvblNlcnZpY2UoKTtcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIHBhZ2VOdW06IDEsXHJcbiAgICBwYWdlU2l6ZTogOCxcclxuICAgIHRvdGFsUGFnZTogMSxcclxuICAgIHRvdGFsQ291bnQ6IC0xLFxyXG4gICAgcmVzZXJ2YXRpb25zOiBbXSBhcyBBcnJheTxSZXNlcnZhdGlvbj5cclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKGBvbkxvYWRgKTtcclxuICAgIC8vIHRoaXMubG9hZFJlc2VydmF0aW9uKDEsIDEwKTtcclxuICAgIC8vIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgLy8gICB0aGlzLnNldERhdGEhKHtcclxuICAgIC8vICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAvLyAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAvLyAgIH0pXHJcbiAgICAvLyB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKXtcclxuICAgIC8vICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgIC8vICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgLy8gICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gKHJlcykgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgLy8gICAgICAgdXNlckluZm86IHJlcyxcclxuICAgIC8vICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcclxuICAgIC8vICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAvLyAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgLy8gICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAvLyAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAvLyAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgICAvLyAgICAgICB9KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSlcclxuICAgIC8vIH1cclxuICB9LFxyXG5cclxuICBvblNob3coKXtcclxuICAgIGNvbnNvbGUubG9nKGBvblNob3dgKTtcclxuICAgIHRoaXMubG9hZFJlc2VydmF0aW9uKDEsIHRoaXMuZGF0YS5wYWdlU2l6ZSk7XHJcbiAgfSxcclxuXHJcbiAgcHJldlBhZ2UoKSB7XHJcbiAgICB0aGlzLmxvYWRSZXNlcnZhdGlvbigtLXRoaXMuZGF0YS5wYWdlTnVtLCB0aGlzLmRhdGEucGFnZVNpemUpO1xyXG4gIH0sXHJcblxyXG4gIG5leHRQYWdlKCkge1xyXG4gICAgdGhpcy5sb2FkUmVzZXJ2YXRpb24oKyt0aGlzLmRhdGEucGFnZU51bSwgdGhpcy5kYXRhLnBhZ2VTaXplKTtcclxuICB9LFxyXG5cclxuICBsb2FkUmVzZXJ2YXRpb24ocGFnZU51bTpudW1iZXIsIHBhZ2VTaXplOm51bWJlciA9IDEwKXtcclxuICAgIHJlc2VydmF0aW9uU3ZjLkdldCgocmVzdWx0KT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICBwYWdlTnVtOiByZXN1bHQuUGFnZU51bWJlcixcclxuICAgICAgICBwYWdlU2l6ZTogcmVzdWx0LlBhZ2VTaXplLFxyXG4gICAgICAgIHRvdGFsUGFnZTogcmVzdWx0LlBhZ2VDb3VudCxcclxuICAgICAgICB0b3RhbENvdW50OiByZXN1bHQuVG90YWxDb3VudCxcclxuICAgICAgICByZXNlcnZhdGlvbnM6IHJlc3VsdC5EYXRhXHJcbiAgICAgIH0pO1xyXG4gICAgfSwge1xyXG4gICAgICBwYWdlTnVtYmVyOiBwYWdlTnVtLFxyXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgIH0pXHJcbiAgfSxcclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==