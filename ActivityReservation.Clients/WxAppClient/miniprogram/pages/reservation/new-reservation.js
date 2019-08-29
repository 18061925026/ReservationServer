"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReservationService_1 = require("../../services/ReservationService");
var ReservationPlaceService_1 = require("../../services/ReservationPlaceService");
var Reservation_1 = require("../../models/Reservation");
var util = require("../../utils/util");
var reservationSvc = new ReservationService_1.ReservationService();
var reservationPlaceSvc = new ReservationPlaceService_1.ReservationPlaceService();
Page({
    data: {
        stepIndex: 0,
        places: [],
        placeNames: [],
        currentDate: new Date().getTime(),
        maxDate: util.addDays(new Date(), 7).getTime(),
        reservation: new Reservation_1.Reservation(),
        reservationPeriods: [],
        checkedPeriods: [],
        unitErr: "",
        acContentErr: "",
        pNameErr: "",
        pPhoneErr: ""
    },
    onLoad: function (params) {
        var _this = this;
        console.log(params);
        reservationPlaceSvc.GetAll(function (result) {
            _this.setData({
                places: result,
                placeNames: result.map(function (p) { return p.PlaceName; })
            });
        });
    },
    onStepChange: function () {
        var _this = this;
        console.log("stepIndex:" + this.data.stepIndex + ",reservationInfo: " + JSON.stringify(this.data.reservation));
        switch (this.data.stepIndex) {
            case 0:
                break;
            case 1:
                if (!this.data.reservation.ReservationPlaceId) {
                    this.data.reservation.ReservationPlaceId = this.data.places[0].PlaceId;
                    this.data.reservation.ReservationPlaceName = this.data.places[0].PlaceName;
                }
                break;
            case 2:
                if (!this.data.reservation.ReservationForDate) {
                    this.data.reservation.ReservationForDate = util.formatDate(new Date());
                }
                reservationPlaceSvc.getAvailablePeriods(function (result) {
                    console.log(result);
                    _this.setData({
                        reservationPeriods: result
                    });
                }, this.data.reservation.ReservationPlaceId, this.data.reservation.ReservationForDate);
                break;
            case 3:
                console.log(this.data.reservationPeriods);
                this.data.reservation.ReservationForTimeIds = this.data.reservationPeriods.filter(function (_) { return _.Checked; }).map(function (x) { return x.PeriodIndex; }).join(",");
                this.data.reservation.ReservationForTime = this.data.reservationPeriods.filter(function (_) { return _.Checked; }).map(function (x) { return x.PeriodTitle; }).join(",");
                break;
            case 4:
                if (this.validateInputParams()) {
                    this.setData({
                        reservation: this.data.reservation
                    });
                }
                else {
                    this.data.stepIndex--;
                    return false;
                }
                break;
        }
        return true;
    },
    prevStep: function (event) {
        this.data.stepIndex--;
        this.onStepChange();
        this.setData({
            stepIndex: this.data.stepIndex
        });
    },
    nextStep: function (event) {
        this.data.stepIndex++;
        this.onStepChange();
        this.setData({
            stepIndex: this.data.stepIndex
        });
    },
    onPlaceChange: function (event) {
        var _a = event.detail, picker = _a.picker, value = _a.value, index = _a.index;
        this.data.reservation.ReservationPlaceId = this.data.places[index].PlaceId;
        this.data.reservation.ReservationPlaceName = this.data.places[index].PlaceName;
    },
    onDateInput: function (event) {
        var dateStr = util.formatDate(new Date(event.detail));
        console.log("date: " + dateStr);
        this.data.reservation.ReservationForDate = dateStr;
    },
    onPeriodsChange: function (event) {
        console.log(event);
        var idxs = new Array();
        for (var _i = 0, _a = event.detail; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var idx = Number.parseInt(name_1.substr(7));
            idxs.push(idx);
        }
        for (var _b = 0, _c = this.data.reservationPeriods; _b < _c.length; _b++) {
            var p = _c[_b];
            if (idxs.indexOf(p.PeriodIndex) > -1) {
                p.Checked = true;
            }
        }
        this.setData({
            checkedPeriods: event.detail
        });
    },
    onUnitChange: function (event) {
        console.log(event);
        this.data.reservation.ReservationUnit = event.detail;
    },
    onActivityContentChange: function (event) {
        console.log(event);
        this.data.reservation.ReservationActivityContent = event.detail;
    },
    onPersonNameChange: function (event) {
        console.log(event);
        this.data.reservation.ReservationPersonName = event.detail;
    },
    onPersonPhoneChange: function (event) {
        console.log(event);
        this.data.reservation.ReservationPersonPhone = event.detail;
    },
    validateInputParams: function () {
        if (!this.data.reservation.ReservationUnit) {
            this.setData({
                unitErr: "预约单位不能为空"
            });
            return false;
        }
        if (this.data.reservation.ReservationUnit.length < 2 || this.data.reservation.ReservationUnit.length > 16) {
            this.setData({
                unitErr: "预约单位长度需要在 2 与 16 之间"
            });
            return false;
        }
        if (this.data.unitErr) {
            this.setData({
                unitErr: ""
            });
        }
        if (!this.data.reservation.ReservationActivityContent) {
            this.setData({
                acContentErr: "活动内容不能为空"
            });
            return false;
        }
        if (this.data.reservation.ReservationActivityContent.length < 2 || this.data.reservation.ReservationActivityContent.length > 16) {
            this.setData({
                acContentErr: "活动内容长度需要在 2 与 16 之间"
            });
            return false;
        }
        if (this.data.acContentErr) {
            this.setData({
                acContentErr: ""
            });
        }
        if (!this.data.reservation.ReservationPersonName) {
            this.setData({
                pNameErr: "预约人名称不能为空"
            });
            return false;
        }
        if (this.data.reservation.ReservationPersonName.length < 2 || this.data.reservation.ReservationPersonName.length > 16) {
            this.setData({
                pNameErr: "预约人名称长度需要在 2 与 16 之间"
            });
            return false;
        }
        if (this.data.pNameErr) {
            this.setData({
                pNameErr: ""
            });
        }
        if (!this.data.reservation.ReservationPersonPhone) {
            this.setData({
                pPhoneErr: "预约人手机号不能为空"
            });
            return false;
        }
        if (!/^1[3-9]\d{9}$/.test(this.data.reservation.ReservationPersonPhone)) {
            this.setData({
                pPhoneErr: "预约人手机号不合法"
            });
            return false;
        }
        if (this.data.pPhoneErr) {
            this.setData({
                pPhoneErr: ""
            });
        }
        return true;
    },
    submit: function (event) {
        if (!this.validateInputParams()) {
            return;
        }
        reservationSvc.NewReservation(function (result) {
            console.log(result);
            if (result.Status == 200) {
                wx.reLaunch({
                    url: '/pages/index/index'
                });
            }
        }, this.data.reservation, 'None', '');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LXJlc2VydmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LXJlc2VydmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0VBQXVFO0FBQ3ZFLGtGQUFpRjtBQUNqRix3REFBdUQ7QUFJdkQsdUNBQXlDO0FBRXpDLElBQU0sY0FBYyxHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztBQUNoRCxJQUFNLG1CQUFtQixHQUFHLElBQUksaURBQXVCLEVBQUUsQ0FBQztBQUUxRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsQ0FBQztRQUNaLE1BQU0sRUFBRSxFQUE2QjtRQUNyQyxVQUFVLEVBQUUsRUFBbUI7UUFDL0IsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQzlDLFdBQVcsRUFBRSxJQUFJLHlCQUFXLEVBQUU7UUFDOUIsa0JBQWtCLEVBQUUsRUFBOEI7UUFDbEQsY0FBYyxFQUFFLEVBQW1CO1FBRW5DLE9BQU8sRUFBRSxFQUFFO1FBQ1gsWUFBWSxFQUFFLEVBQUU7UUFDaEIsUUFBUSxFQUFFLEVBQUU7UUFDWixTQUFTLEVBQUUsRUFBRTtLQUNkO0lBQ0QsTUFBTSxFQUFOLFVBQU8sTUFBVztRQUFsQixpQkFTQztRQVJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTTtZQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNsQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLEVBQVgsQ0FBVyxDQUFDO2FBQ3pDLENBQUMs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LElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBQztZQUN6QyxJQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsWUFBWTthQUN4QixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFBQztZQUMvRCxJQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsV0FBVzthQUN2QixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNmLElBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxFQUFFO2FBQ2QsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLEVBQU4sVUFBTyxLQUFVO1FBRWYsSUFBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELGNBQWMsQ0FBQyxjQUFjLENBQUMsVUFBQSxNQUFNO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBQztnQkFDdEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFDVixHQUFHLEVBQUUsb0JBQW9CO2lCQUMxQixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL1Jlc2VydmF0aW9uU2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2VydmF0aW9uUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvUmVzZXJ2YXRpb25QbGFjZVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNlcnZhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9SZXNlcnZhdGlvbic7XHJcbmltcG9ydCB7IFJlc2VydmF0aW9uUGxhY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvUmVzZXJ2YXRpb25QbGFjZSc7XHJcbmltcG9ydCB7IFJlc2VydmF0aW9uUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Jlc2VydmF0aW9uUGVyaW9kJztcclxuXHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5jb25zdCByZXNlcnZhdGlvblN2YyA9IG5ldyBSZXNlcnZhdGlvblNlcnZpY2UoKTtcclxuY29uc3QgcmVzZXJ2YXRpb25QbGFjZVN2YyA9IG5ldyBSZXNlcnZhdGlvblBsYWNlU2VydmljZSgpO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgc3RlcEluZGV4OiAwLFxyXG4gICAgcGxhY2VzOiBbXSBhcyBBcnJheTxSZXNlcnZhdGlvblBsYWNlPixcclxuICAgIHBsYWNlTmFtZXM6IFtdIGFzIEFycmF5PHN0cmluZz4sXHJcbiAgICBjdXJyZW50RGF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICBtYXhEYXRlOiB1dGlsLmFkZERheXMobmV3IERhdGUoKSwgNykuZ2V0VGltZSgpLFxyXG4gICAgcmVzZXJ2YXRpb246IG5ldyBSZXNlcnZhdGlvbigpLFxyXG4gICAgcmVzZXJ2YXRpb25QZXJpb2RzOiBbXSBhcyBBcnJheTxSZXNlcnZhdGlvblBlcmlvZD4sXHJcbiAgICBjaGVja2VkUGVyaW9kczogW10gYXMgQXJyYXk8c3RyaW5nPixcclxuICAgIFxyXG4gICAgdW5pdEVycjogXCJcIixcclxuICAgIGFjQ29udGVudEVycjogXCJcIixcclxuICAgIHBOYW1lRXJyOiBcIlwiLFxyXG4gICAgcFBob25lRXJyOiBcIlwiXHJcbiAgfSxcclxuICBvbkxvYWQocGFyYW1zOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcblxyXG4gICAgcmVzZXJ2YXRpb25QbGFjZVN2Yy5HZXRBbGwoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICBwbGFjZXM6IHJlc3VsdCxcclxuICAgICAgICBwbGFjZU5hbWVzOiByZXN1bHQubWFwKHAgPT4gcC5QbGFjZU5hbWUpXHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uU3RlcENoYW5nZSgpOiBib29sZWFuIHtcclxuICAgIGNvbnNvbGUubG9nKGBzdGVwSW5kZXg6JHt0aGlzLmRhdGEuc3RlcEluZGV4fSxyZXNlcnZhdGlvbkluZm86ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLnJlc2VydmF0aW9uKX1gKTtcclxuICAgIHN3aXRjaCAodGhpcy5kYXRhLnN0ZXBJbmRleCkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBsYWNlSWQpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBsYWNlSWQgPSB0aGlzLmRhdGEucGxhY2VzWzBdLlBsYWNlSWQ7XHJcbiAgICAgICAgICB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25QbGFjZU5hbWUgPSB0aGlzLmRhdGEucGxhY2VzWzBdLlBsYWNlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvbkZvckRhdGUpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvbkZvckRhdGUgPSB1dGlsLmZvcm1hdERhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmVzZXJ2YXRpb25QbGFjZVN2Yy5nZXRBdmFpbGFibGVQZXJpb2RzKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHJlc2VydmF0aW9uUGVyaW9kczogcmVzdWx0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25QbGFjZUlkLCB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25Gb3JEYXRlKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnJlc2VydmF0aW9uUGVyaW9kcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uRm9yVGltZUlkcyA9IHRoaXMuZGF0YS5yZXNlcnZhdGlvblBlcmlvZHMuZmlsdGVyKF89Pl8uQ2hlY2tlZCkubWFwKHg9PnguUGVyaW9kSW5kZXgpLmpvaW4oXCIsXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvbkZvclRpbWUgPSB0aGlzLmRhdGEucmVzZXJ2YXRpb25QZXJpb2RzLmZpbHRlcihfPT5fLkNoZWNrZWQpLm1hcCh4PT4geC5QZXJpb2RUaXRsZSkuam9pbihcIixcIik7XHJcbiAgICBcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICBpZih0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKSl7XHJcbiAgICAgICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICAgICAgcmVzZXJ2YXRpb246IHRoaXMuZGF0YS5yZXNlcnZhdGlvblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB0aGlzLmRhdGEuc3RlcEluZGV4LS07XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIHByZXZTdGVwKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZGF0YS5zdGVwSW5kZXgtLTtcclxuICAgIHRoaXMub25TdGVwQ2hhbmdlKCk7XHJcbiAgICAvL1xyXG4gICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgIHN0ZXBJbmRleDogdGhpcy5kYXRhLnN0ZXBJbmRleFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBuZXh0U3RlcChldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGEuc3RlcEluZGV4Kys7XHJcbiAgICB0aGlzLm9uU3RlcENoYW5nZSgpO1xyXG4gICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgIHN0ZXBJbmRleDogdGhpcy5kYXRhLnN0ZXBJbmRleFxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgb25QbGFjZUNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCB7IHBpY2tlciwgdmFsdWUsIGluZGV4IH0gPSBldmVudC5kZXRhaWw7XHJcbiAgICB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25QbGFjZUlkID0gdGhpcy5kYXRhLnBsYWNlc1tpbmRleF0uUGxhY2VJZDtcclxuICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBsYWNlTmFtZSA9IHRoaXMuZGF0YS5wbGFjZXNbaW5kZXhdLlBsYWNlTmFtZTtcclxuICB9LFxyXG5cclxuICBvbkRhdGVJbnB1dChldmVudDogYW55KSB7XHJcbiAgICBsZXQgZGF0ZVN0ciA9IHV0aWwuZm9ybWF0RGF0ZShuZXcgRGF0ZShldmVudC5kZXRhaWwpKTtcclxuICAgIGNvbnNvbGUubG9nKGBkYXRlOiAke2RhdGVTdHJ9YCk7XHJcbiAgICB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25Gb3JEYXRlID0gZGF0ZVN0cjtcclxuICB9LFxyXG5cclxuICBvblBlcmlvZHNDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG5cclxuICAgIGxldCBpZHhzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgIGZvciAobGV0IG5hbWUgb2YgKGV2ZW50LmRldGFpbCBhcyBBcnJheTxzdHJpbmc+KSkge1xyXG4gICAgICBsZXQgaWR4ID0gTnVtYmVyLnBhcnNlSW50KG5hbWUuc3Vic3RyKDcpKTsgICAgICBcclxuICAgICAgaWR4cy5wdXNoKGlkeCk7XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IHAgb2YgdGhpcy5kYXRhLnJlc2VydmF0aW9uUGVyaW9kcyl7XHJcbiAgICAgIGlmKGlkeHMuaW5kZXhPZihwLlBlcmlvZEluZGV4KSA+IC0xKXtcclxuICAgICAgICBwLkNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgIGNoZWNrZWRQZXJpb2RzOiBldmVudC5kZXRhaWxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIG9uVW5pdENoYW5nZShldmVudDogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25Vbml0ID0gZXZlbnQuZGV0YWlsO1xyXG4gIH0sXHJcbiAgb25BY3Rpdml0eUNvbnRlbnRDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgdGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uQWN0aXZpdHlDb250ZW50ID0gZXZlbnQuZGV0YWlsO1xyXG4gIH0sXHJcbiAgb25QZXJzb25OYW1lQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBlcnNvbk5hbWUgPSBldmVudC5kZXRhaWw7XHJcbiAgfSxcclxuICBvblBlcnNvblBob25lQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgIHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBlcnNvblBob25lID0gZXZlbnQuZGV0YWlsO1xyXG4gIH0sXHJcblxyXG5cclxuICB2YWxpZGF0ZUlucHV0UGFyYW1zKCk6IGJvb2xlYW57XHJcbiAgICBpZighdGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uVW5pdCl7XHJcbiAgICAgICg8YW55PnRoaXMpLnNldERhdGEoe1xyXG4gICAgICAgIHVuaXRFcnI6IFwi6aKE57qm5Y2V5L2N5LiN6IO95Li656m6XCJcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblVuaXQubGVuZ3RoIDwgMiB8fCB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25Vbml0Lmxlbmd0aCA+IDE2KXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgdW5pdEVycjogXCLpooTnuqbljZXkvY3plb/luqbpnIDopoHlnKggMiDkuI4gMTYg5LmL6Ze0XCJcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS51bml0RXJyKXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgdW5pdEVycjogXCJcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uQWN0aXZpdHlDb250ZW50KXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgYWNDb250ZW50RXJyOiBcIua0u+WKqOWGheWuueS4jeiDveS4uuepulwiXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25BY3Rpdml0eUNvbnRlbnQubGVuZ3RoIDwgMiB8fCB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25BY3Rpdml0eUNvbnRlbnQubGVuZ3RoID4gMTYpe1xyXG4gICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICBhY0NvbnRlbnRFcnI6IFwi5rS75Yqo5YaF5a656ZW/5bqm6ZyA6KaB5ZyoIDIg5LiOIDE2IOS5i+mXtFwiXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEuYWNDb250ZW50RXJyKXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgYWNDb250ZW50RXJyOiBcIlwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCF0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25QZXJzb25OYW1lKXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgcE5hbWVFcnI6IFwi6aKE57qm5Lq65ZCN56ew5LiN6IO95Li656m6XCJcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5yZXNlcnZhdGlvbi5SZXNlcnZhdGlvblBlcnNvbk5hbWUubGVuZ3RoIDwgMiB8fCB0aGlzLmRhdGEucmVzZXJ2YXRpb24uUmVzZXJ2YXRpb25QZXJzb25OYW1lLmxlbmd0aCA+IDE2KXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgcE5hbWVFcnI6IFwi6aKE57qm5Lq65ZCN56ew6ZW/5bqm6ZyA6KaB5ZyoIDIg5LiOIDE2IOS5i+mXtFwiXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEucE5hbWVFcnIpe1xyXG4gICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICBwTmFtZUVycjogXCJcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uUGVyc29uUGhvbmUpe1xyXG4gICAgICAoPGFueT50aGlzKS5zZXREYXRhKHtcclxuICAgICAgICBwUGhvbmVFcnI6IFwi6aKE57qm5Lq65omL5py65Y+35LiN6IO95Li656m6XCJcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKCEvXjFbMy05XVxcZHs5fSQvLnRlc3QodGhpcy5kYXRhLnJlc2VydmF0aW9uLlJlc2VydmF0aW9uUGVyc29uUGhvbmUpKXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgcFBob25lRXJyOiBcIumihOe6puS6uuaJi+acuuWPt+S4jeWQiOazlVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEucFBob25lRXJyKXtcclxuICAgICAgKDxhbnk+dGhpcykuc2V0RGF0YSh7XHJcbiAgICAgICAgcFBob25lRXJyOiBcIlwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuXHJcbiAgc3VibWl0KGV2ZW50OiBhbnkpIHtcclxuICAgIC8vIHZhbGlkYXRlIHBhcmFtIG5hbWVcclxuICAgIGlmKCF0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKSl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICByZXNlcnZhdGlvblN2Yy5OZXdSZXNlcnZhdGlvbihyZXN1bHQgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICBpZihyZXN1bHQuU3RhdHVzID09IDIwMCl7XHJcbiAgICAgICAgd3gucmVMYXVuY2goe1xyXG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLmRhdGEucmVzZXJ2YXRpb24sICdOb25lJywgJycpO1xyXG4gIH1cclxufSkiXX0=