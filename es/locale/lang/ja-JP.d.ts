declare const _default: {
    name: string;
    tel: string;
    save: string;
    confirm: string;
    cancel: string;
    delete: string;
    complete: string;
    loading: string;
    telEmpty: string;
    nameEmpty: string;
    nameInvalid: string;
    confirmDelete: string;
    telInvalid: string;
    vanCalendar: {
        end: string;
        start: string;
        title: string;
        confirm: string;
        startEnd: string;
        weekdays: string[];
        monthTitle: (year: number, month: number) => string;
        rangePrompt: (maxRange: number) => string;
    };
    vanCascader: {
        select: string;
    };
    vanContactCard: {
        addText: string;
    };
    vanContactList: {
        addText: string;
    };
    vanPagination: {
        prev: string;
        next: string;
    };
    vanPullRefresh: {
        pulling: string;
        loosing: string;
    };
    vanSubmitBar: {
        label: string;
    };
    vanCoupon: {
        unlimited: string;
        discount: (discount: number) => string;
        condition: (condition: number) => string;
    };
    vanCouponCell: {
        title: string;
        tips: string;
        count: (count: number) => string;
    };
    vanCouponList: {
        empty: string;
        exchange: string;
        close: string;
        enable: string;
        disabled: string;
        placeholder: string;
    };
    vanAddressEdit: {
        area: string;
        postal: string;
        areaEmpty: string;
        addressEmpty: string;
        postalEmpty: string;
        defaultAddress: string;
        telPlaceholder: string;
        namePlaceholder: string;
        areaPlaceholder: string;
    };
    vanAddressEditDetail: {
        label: string;
        placeholder: string;
    };
    vanAddressList: {
        add: string;
    };
};
export default _default;
