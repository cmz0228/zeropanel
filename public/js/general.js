//"use strict";

//get left date
function countdown(date, dom) {
    let timerInterval = null;

    function updateTimer() {
        const endDate = new Date(date);
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        if (distance <= 0) {
        clearInterval(timerInterval);
        } else {
            const days = Math.floor(distance / (1000 * 3600 * 24));
            const hours = Math.floor((distance % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((distance % (1000 * 3600)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const countdown = `${days}${i18next.t('day')} ${hours}:${minutes}:${seconds}`;
            document.getElementById(dom).innerHTML = countdown;
        }
    } 
    // 初始状态
    updateTimer();
    // 开启计时器
    timerInterval = setInterval(updateTimer, 1000);
}

//clipboard
var clipboard = new ClipboardJS('.copy-text');
clipboard.on('success', function(e) {
    getResult(i18next.t('copy success'), "", "success");
});

// get result 
function getResult(titles, texts, icons) {
    Swal.fire({
        title: titles,
        text: texts,
        icon: icons,
        buttonsStyling: false,
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    });
}
$(document).ready(function (){
    $("a.menu-link[href='"+window.location.pathname+"']").addClass('active');
});
//get load
function getLoad() {
    Swal.fire({
        title: '',
        text: '',
        timer: 50000,
        confirmButtonText: "",
        didOpen: function() {
            Swal.showLoading()
        }
    }).then(function(result){
        if (result.dismiss == "timer") {
            console.log("I was closed by the timer")
        }
    });
}

// update email
var KTUsersUpdateEmail = function () {
    // Shared variables
    const element = document.getElementById('zero_modal_user_update_email');
    const form = element.querySelector('#zero_modal_user_update_email_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initUpdateEmail = () => {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'profile_email': {
                        validators: {
                            notEmpty: {
                                message: 'Email address is required'
                            },
                            emailAddress: {
                                message: '邮箱格式不正确'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
        submitButton.addEventListener('click', function (e) {
            // Prevent default button action
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click 
                        submitButton.disabled = true;

                        // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        setTimeout(function () {

                            // Show popup confirmation 
                            $.ajax({
                                type: "POST",
                                url: "/user/update_profile/email",
                                dataType: "json",
                                data: {
                                    newemail: $("#profile_email").val()
                                },
                                success: function(data) {
                                    if(data.ret === 1) {
                                        Swal.fire({
                                            text: data.msg,
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        }).then(function (result) {
                                            if (result.isConfirmed) {
                                                location.reload();
                                            }
                                        });
                                    } else {
                                        getResult(data.msg, '', 'error');
                                        // Remove loading indication
                                        submitButton.removeAttribute('data-kt-indicator');

                                        // Enable button
                                        submitButton.disabled = false;
                                    }
                                }
                            });
                        }, 2000);
                    }
                });
            }
        });
    }

    return {
        // Public functions
        init: function () {
            initUpdateEmail();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersUpdateEmail.init();
});

// update password
var KTUsersUpdatePassword = function () {
    // Shared variables
    const element = document.getElementById('zero_modal_user_update_password');
    const form = element.querySelector('#zero_modal_user_update_password_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initUpdatePassword = () => {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'current_password': {
                        validators: {
                            notEmpty: {
                                message: '请输入当前密码'
                            }
                        }
                    },
                    'password': {
                        validators: {
                            notEmpty: {
                                message: '请输入新密码'
                            },
                            callback: {
                                message: '请输入有效的密码',
                                callback: function (input) {
                                    if (input.value.length > 0) {
                                        return validatePassword();
                                    }
                                }
                            }
                        }
                    },
                    'confirm_password': {
                        validators: {
                            notEmpty: {
                                message: '请确认新密码'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="new_password"]').value;
                                },
                                message: '新密码两次输入不一致'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        submitButton.disabled = true;

                        setTimeout(function () {
                            
                            $.ajax({
                                type: "POST",
                                url: "/user/update_profile/password",
                                dataType: "json",
                                data: {
                                    current_password: $("#current_password").val(),
                                    new_password: $("#new_password").val()
                                },
                                success: function(data) {
                                    if(data.ret === 1) {
                                        Swal.fire({
                                            text: data.msg,
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        }).then(function (result) {
                                            if (result.isConfirmed) {
                                                modal.hide();
                                                location.reload();
                                            }
                                        });
                                    } else {
                                        getResult(data.msg, '', 'error');
                                        submitButton.removeAttribute('data-kt-indicator');
                                        submitButton.disabled = false;
                                    }
                                }
                            });

                            //form.submit(); // Submit form
                        }, 2000);
                    }
                });
            }
        });
    }

    return {
        // Public functions
        init: function () {
            initUpdatePassword();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersUpdatePassword.init();
});

// enable notify 
function KTUsersEnableNotify(type) {
    if (document.getElementById('notify_email').checked) {
        var types = type;
    }else if (document.getElementById('notify_telegram').checked) {
        var types = type;
    }
    $.ajax({
        type: "POST",
        url: "/user/enable_notify",
        dataType: "json",
        data: {
            notify_type: types
        },
        success: function(data) {}
    });
}

//reset ss connet passwd
function KTUsersResetPasswd() {
    $.ajax({
        type: "POST",
        url: "/user/update_profile/passwd",
        dataType: "json",
        data: {},
        success: function(data) {
            if(data.ret === 1) {
                Swal.fire({
                    text: data.msg,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            } else {
                getResult(data.msg, '', 'error');
            }
        }
    });
}

// reset uuid
function KTUsersResetUUID() {
    $.ajax({
        type: "POST",
        url: "/user/update_profile/uuid",
        dataType: "json",
        data: {},
        success: function(data) {
            if(data.ret === 1) {
                Swal.fire({
                    text: data.msg,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            } else {
                getResult(data.msg, '', 'error');
            }
        }
    });
}

// reset sub link
function KTUsersResetSubLink() {
    $.ajax({
        type: "POST",
        url: "/user/update_profile/sub_token",
        dataType: "json",
        data: {},
        success: function(data) {
            if(data.ret === 1) {
                Swal.fire({
                    text: data.msg,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            } else {
                getResult(data.msg, '', 'error');
            }
        }
    });
}

// show configure product modal 
function kTUserConfigureProductModal(id, currency) {
    function getProductData() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/user/product/getinfo",
                dataType: "json",
                data: {
                    id
                },
                success: function(data){
                    resolve(data);
                }
            });
        })
    }
    getProductData().then(function(data) {
        const product_info = data;
        const html = $('#zero_product_'+id).html();
        const name = product_info.name;
        const month_price = product_info.month_price;
        const quarter_price = product_info.quarter_price;
        const half_year_price = product_info.half_year_price;
        const year_price = product_info.year_price;
        const two_year_price = product_info.two_year_price;
        const onetime_price = product_info.onetime_price;
        const submitButton = document.querySelector('[data-kt-users-action="submit"]');
        if (product_info.type == 1) {
            const all_prices = {
                month_price: {
                  label: i18next.t('monthly fee'),
                  value: month_price
                },
                quarter_price: {
                  label: i18next.t('quarterly fee'),
                  value: quarter_price
                },
                half_year_price: {
                  label: i18next.t('semi annua fee'),
                  value: half_year_price
                },
                year_price: {
                  label: i18next.t('annual fee'),
                  value: year_price
                },
                two_year_price: {
                    label: i18next.t('biennial fee'),
                    value: two_year_price
                }
              };
              
              Object.entries(all_prices).forEach(([key, { label, value }]) => {
                if (value) {
                  $('#zero_modal_configure_product_' + key).html(`<a class="btn btn-outline btn-active-light-primary" data-bs-toggle="pill">${label}</a>`);
                  $('#zero_modal_configure_product_' + key).attr('onclick', `KTUsersChangePlan("${value}", ${id}, "${key}", "${currency}")`);
                  if (key === 'month_price') {
                    $('#zero_modal_configure_product_' + key + ' a').addClass('active');
                  }
                }
              });
        }
        var modalInnerHtml = $('#zero_modal_configure_product_inner_html');
        var modalName = $('#zero_modal_configure_product_name');
        var modalPrice = $('#zero_modal_configure_product_price');
        var modalTotal = $('#zero_modal_configure_product_total');
        var modalCoupon = $('#zero_modal_configure_coupon');
        var modalCouponHtml = $('#zero_modal_configure_coupon_html');

        modalInnerHtml.html(html);
        product_info.type == 3 ? modalCouponHtml.hide() : false;
        const product_final_price = product_info.type == 1 ? month_price : onetime_price; // 判断不同类型商品的价格
        modalName.html(product_info.type == 1 ? name + '&nbsp;X&nbsp;' + i18next.t('monthly fee') : name);
        modalPrice.html(product_final_price + currency);
        modalTotal.html(product_final_price + currency);
        modalCoupon.attr('onclick', 'KTUserVerifyCoupon('+id+')');
        submitButton.setAttribute('onclick', 'KTUsersCreateOrder('+1+', "' +product_final_price+ '", ' +id+ ')');

        $("#zero_modal_configure_product").modal("show");
    });
    
}

function KTUsersChangePlan(price, id, type, currency) {
    const productPlanMap = {
        'month_price': i18next.t('monthly fee'),
        'quarter_price': i18next.t('quarterly fee'),
        'half_year_price': i18next.t('semi annua fee'),
        'year_price':i18next.t('annual fee')
        };
    const name = $('#zero_product_name_'+id).html();
    const submitButton = document.querySelector('[data-kt-users-action="submit"]');
    $('#zero_modal_configure_product_name').html(`${name} X ${productPlanMap[type]}`);
    $('#zero_modal_configure_product_price').html(`${price}${currency}`);
    $('#zero_modal_configure_product_total').html(`${price}${currency}`);
    submitButton.setAttribute('onclick', 'KTUsersCreateOrder('+1+', "' +price+ '", ' +id+ ')');
}

// verify coupon
function KTUserVerifyCoupon(product_id) {
    $.ajax({
        type: "POST",
        url: "/user/verify_coupon",
        dataType: "json",
        data: {
            coupon_code: $("#zero_coupon_code").val(),
            product_id
        },
        success: function (data) {
            if (data.ret == 1) {
                document.getElementById('zero_modal_configure_product_total').innerHTML = data.total + 'USD';
            } else {
                getResult(data.msg, '', 'error');
            }
        }
    })
}
// create order
function KTUsersCreateOrder(type, price, product_id) {
    const submitButton = document.querySelector('[data-kt-users-action="submit"]');
    submitButton.setAttribute('data-kt-indicator', 'on');
    submitButton.disabled = true;
    switch (type) {
        case 1:
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/user/order/create_order/"+type,
                    dataType: "json",
                    data: {
                        product_id: product_id,
                        product_price: price,
                        coupon_code: $("#zero_coupon_code").val(),
                    },
                    success: function (data) {
                        if (data.ret == 1) {
                            $(location).attr('href', '/user/order/' + data.order_id);
                        } else {
                            getResult(data.msg, '', 'error');
                            submitButton.removeAttribute('data-kt-indicator');
                            submitButton.disabled = false;
                        }
                    }
                });
            }, 2000)
            break;
        case 2:
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/user/order/create_order/"+type,
                    dataType: "json",
                    data: {
                        add_credit_amount: $("#add_credit_amount").val()
                    },
                    success: function (data) {
                        if (data.ret == 1) {
                            $(location).attr('href', '/user/order/' + data.order_id);
                        } else {
                            getResult(data.msg, '', 'error');
                            submitButton.removeAttribute('data-kt-indicator');
                            submitButton.disabled = false;
                        }
                    }
                });
            }, 2000)
            break; 
    }
}

//pay for order
function KTUsersPayOrder(order_no) {
    const submitButton = document.querySelector('[data-kt-users-action="submit"]');
    submitButton.setAttribute('data-kt-indicator', 'on');
    submitButton.disabled = true;
    let paymentMethod = $("#payment_method a.active").attr("data-name");
    let orderNo = order_no;
    
    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: "/user/order/pay_order",
            dataType: "json",
            data: {method: paymentMethod, order_no: orderNo},
            success: function (data) {
                if (data.ret == 1) {
                    $(location).attr('href', data.url);
                } else if (data.ret == 2){
                    Swal.fire({
                        text: data.msg,
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {confirmButton: "btn btn-primary"}
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                    submitButton.removeAttribute('data-kt-indicator');
                    submitButton.disabled = false;
                } else {
                    getResult(data.msg, '', 'error');
                    submitButton.removeAttribute('data-kt-indicator');
                    submitButton.disabled = false;
                }
            }
        });
    }, 2000)  
}

// ticket
function KTUsersTicket(type, id, status) {
    const submitButton = document.querySelector('[data-kt-users-action="submit"]');
    submitButton.setAttribute('data-kt-indicator', 'on');
    submitButton.disabled = true;
    var text = editors.getData();
    switch (type) {
        case 'create_ticket':
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/user/ticket/create",
                    dataType: "json",
                    data: {
                        title: $("#zero_create_ticket_title").val(),
                        comment: text,
                        type: $("#zero_create_ticket_type").val()
                    },
                    success: function (data) {
                        if (data.ret == 1) {
                            $(location).attr('href', '/user/ticket/view/'+data.id);
                        } else {
                            getResult(data.msg, '', 'error');
                            submitButton.removeAttribute('data-kt-indicator');
                            submitButton.disabled = false;
                        }
                    }
                });
            }, 2000);
        break;
        case 'reply_ticket':
            setTimeout(function () {
                $.ajax({
                    type: "PUT",
                    url: "/user/ticket/update",
                    dataType: "json",
                    data: {
                        id,
                        status,
                        comment: text
                    },
                    success: function (data) {
                        if (data.ret == 1) {
                            location.reload();
                        } else {
                            getResult(data.msg, '', 'error');
                            submitButton.removeAttribute('data-kt-indicator');
                            submitButton.disabled = false;
                        }
                    }
                });
            }, 2000);
        break;
    }
}

// show node 
function KTUsersShowNodeInfo(id, userclass, nodeclass) {
    nodeid = id;
    usersclass = userclass;
    nodesclass = nodeclass;
    if (usersclass >= nodesclass) {
        getLoad();
		$.ajax({
			type: "GET",
			url: "/user/nodeinfo/" + nodeid,
			dataType: "json",
			data: {},
			success: function(data) {
				if (data.ret == 1){
                    const info = data.info;
                    const qrcodeHtml = '<div class="pb-3" align="center" id="qrcode' + nodeid + '"></div>';
                    var content = data.url;
                    switch (data.type) {
                        case 2:                           
                            // 循环设置HTML内容
                            const selectors_vmess = {
                                '#zero_modal_vmess_node_info_remark': 'remark',
                                '#zero_modal_vmess_node_info_address': 'address',
                                '#zero_modal_vmess_node_info_port': 'port',
                                '#zero_modal_vmess_node_info_aid': 'aid',
                                '#zero_modal_vmess_node_info_uuid': 'uuid',
                                '#zero_modal_vmess_node_info_net': 'net',
                                '#zero_modal_vmess_node_info_path': 'path',
                                '#zero_modal_vmess_node_info_host': 'host',
                                '#zero_modal_vmess_node_info_servicename': 'servicename', 
                                '#zero_modal_vmess_node_info_type': 'type',
                                '#zero_modal_vmess_node_info_security': 'security'
                            }
                            
                            for (let selector in selectors_vmess) {
                                $(selector).html(info[selectors_vmess[selector]]);
                              }
                            // 生成QRCode
                            $('#zero_modal_vmess_node_info_qrcode').html(qrcodeHtml);                           
                            $("#zero_modal_vmess_node_info").modal('show'); 
                            break;
                        case 4:
                            const selectors_trojan = {
                                '#zero_modal_trojan_node_info_remark': 'remark', 
                                '#zero_modal_trojan_node_info_address': 'address',
                                '#zero_modal_trojan_node_info_port': 'port',
                                '#zero_modal_trojan_node_info_uuid': 'uuid',
                                '#zero_modal_trojan_node_info_sni': 'sni',
                                '#zero_modal_trojan_node_info_security': 'security',
                                '#zero_modal_trojan_node_info_flow': 'flow',
                            };
                            
                            for (let selector in selectors_trojan) {
                                $(selector).html(info[selectors_trojan[selector]]);
                              }
                            $("#zero_modal_trojan_node_info_qrcode").html(qrcodeHtml);
                            $("#zero_modal_trojan_node_info").modal('show');
                            break;
                        case 3:
                            const selectors_vless = {
                                '#zero_modal_vless_node_info_remark': 'remark',
                                '#zero_modal_vless_node_info_address': 'address',
                                '#zero_modal_vless_node_info_port': 'port',
                                '#zero_modal_vless_node_info_uuid': 'uuid',
                                '#zero_modal_vless_node_info_net': 'net',
                                '#zero_modal_vless_node_info_path': 'path',
                                '#zero_modal_vless_node_info_host': 'host',
                                '#zero_modal_vless_node_info_servicename': 'servicename',
                                '#zero_modal_vless_node_info_type': 'type',
                                '#zero_modal_vless_node_info_security': 'security',
                                '#zero_modal_vless_node_info_flow': 'flow',
                                '#zero_modal_vless_node_info_sni': 'sni',
                              }
                              
                            for (let selector in selectors_vless) {
                            $(selector).html(info[selectors_vless[selector]]);
                            }
                            $("#zero_modal_vless_node_info_qrcode").html(qrcodeHtml);
                            $("#zero_modal_vless_node_info").modal('show');
                            break;
                        case 1:
                            const selectors_ss = {
                                '#zero_modal_shadowsocks_node_info_remark': 'remark',
                                '#zero_modal_shadowsocks_node_info_address': 'address',
                                '#zero_modal_shadowsocks_node_info_port': 'port',
                                '#zero_modal_shadowsocks_node_info_method': 'method',
                                '#zero_modal_shadowsocks_node_info_passwd': 'passwd',
                            }

                            for (let selector in selectors_ss) {
                                $(selector).html(info[selectors_ss[selector]]);
                            }
                            $("#zero_modal_shadowsocks_node_info_qrcode").html(qrcodeHtml);
                            $("#zero_modal_shadowsocks_node_info").modal('show');
                            break;
                    }
                    $("#qrcode"  + nodeid).qrcode({
                        width: 200,
                        height: 200,
                        render: "canvas",
                        text: content
                    });
                    Swal.close();
				} else {                   
					getResult(data.msg, "", "error");
				}
			}
		});
    } else {
        getResult("权限不足", "", "error");
    }
}

// withdraw 
function KTUsersWithdrawCommission(type){
    switch (type) {
        case 1:
            $.post("/user/withdraw_commission", {
                commission: $('#withdraw_commission_amount').val(),
                type: $("#withdraw_type a.active").attr("data-type")
                }, function(data) {
                getResult(data.msg, '', (data.ret == 1) ? 'success' : 'error');
                }, "json");
            break;
        case 2:
            $.post("/user/withdraw_account_setting", {
                acc: $('#withdraw_account_value').val(),
                method: $('#withdraw_method').val()
                }, function(data) {
                getResult(data.msg, '', (data.ret == 1) ? 'success' : 'error');
                }, "json");
        default:
            0;
    }
}

//import sub url
function oneclickImport(client, subLink) {
   
    quanx_config = {
        "server_remote": [
            subLink + ', tag=' + webName
        ]
    }
    var sublink = {
      surfboard: "surfboard:///install-config?url=" + encodeURIComponent(subLink),
      quantumult: "quantumult://configuration?server=" + btoa(subLink).replace(/=/g, '') + "&filter=YUhSMGNITTZMeTl0ZVM1dmMyOWxZMjh1ZUhsNkwzSjFiR1Z6TDNGMVlXNTBkVzExYkhRdVkyOXVaZw",
      shadowrocket: "shadowrocket://add/sub://" + btoa(subLink),
      surge4: "surge4:///install-config?url=" + encodeURIComponent(subLink),
      clash: "clash://install-config?url=" + encodeURIComponent(subLink),
      sagernet: "sn://subscription?url=" + encodeURIComponent(subLink),
      quantumultx: "quantumult-x:///add-resource?remote-resource=" + encodeURIComponent(JSON.stringify(quanx_config)),
    }

    Swal.fire({
        title: i18next.t('confirm importing subscription link'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Discard",
        focusClose: false,
        focusConfirm: false,
    }).then((result) => {
        if (result.value) {
        window.location.href = sublink[client];
        }
    });
}

