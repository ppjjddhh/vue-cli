<template>
    <div style="height:100%;background:#f7f7f7">
        <DatetimePicker
            ref='datetimePicker'
            v-model="currentDate"
            type="datehour"
            title="请选择"
            :min-date="minDate"
            :max-date="maxDate"
            :min-hour="9"
            :max-hour="18"
            :formatter="formatter"
            @cancel="handleCancel"
            @confirm="handleConfirm">
        </DatetimePicker>
    </div>
</template>

<script>
    import DatetimePicker  from 'vant/lib/datetime-picker';
    import 'vant/lib/datetime-picker/style';
    var _utils2 = require("vant/lib/datetime-picker/utils");
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                no:this.$route.query.no,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
            }
        },
        components: {
            DatetimePicker
        },
        created() {
        },
        mounted() {
            console.log(this.$refs.datetimePicker)
            var _this = this.$refs.datetimePicker.$children[0]
            //改写原本组件中的方法 使得日期+小时组件可以限制小时的选择范围
            _this.getBoundary = function(type, value) {
                var _ref;
                var boundary = _this[type + "Date"];
                var year = boundary.getFullYear();
                var month = 1;
                var date = 1;
                var hour = 9;
                var minute = 0;
                if (type === 'max') {
                    month = 12;
                    date = (0, _utils2.getMonthEndDay)(value.getFullYear(), value.getMonth() + 1);
                    hour = 18;
                    minute = 59;
                }
                if (value.getFullYear() === year) {
                    month = boundary.getMonth() + 1;

                    if (value.getMonth() + 1 === month) {
                    date = boundary.getDate();

                    if (value.getDate() === date) {
                        hour = boundary.getHours();

                        if (value.getHours() === hour) {
                        minute = boundary.getMinutes();
                        }
                    }
                    }
                }

                return _ref = {}, _ref[type + "Year"] = year, _ref[type + "Month"] = month, _ref[type + "Date"] = date, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
            }
        },
        methods: {
            formatter(type, val) {
                if (type === 'hour') {
                    if((parseInt(val)>8 && parseInt(val)<19)){
                        return `${val}:00`;
                    }
                }else{
                    return val;
                }
            },
            handleCancel(){
                window.history.go(-1)
            },
            handleConfirm(val){
                let orderDate = val.getFullYear() + '-' + (val.getMonth()+1) + '-' + val.getDate() + ' ' + val.getHours() + ':00'
                this.$store.dispatch('postCommitDatetime', {
                    "no": this.no,
                    "orderDate":orderDate //"2021-01-12 11:00"
                }).then(res => {
                    if (res.data.code === 0) {
                        Toast('更新时间成功');
                        window.history.go(-1)
                    } else {
                        Toast(res.data.msg);
                    }
                }
                ).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
