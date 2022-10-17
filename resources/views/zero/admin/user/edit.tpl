{include file='admin/main.tpl'}


<main class="content">
    <div class="content-header ui-content-header">
        <div class="container">
            <h1 class="content-heading">用户编辑 #{$edit_user->id}</h1>
        </div>
    </div>
    <div class="container">
        <div class="col-lg-12 col-sm-12">
            <section class="content-inner margin-top-no">

                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="email">邮箱</label>
                                <input class="form-control maxwidth-edit" id="email" type="email"
                                       value="{$edit_user->email}">
                            </div>
                            
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="name">用户昵称</label>
                                <input class="form-control maxwidth-edit" id="name" type="text"
                                       value="{$edit_user->name}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="remark">备注(仅对管理员可见)</label>
                                <input class="form-control maxwidth-edit" id="remark" type="text"
                                       value="{$edit_user->remark}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="pass">密码(不修改请留空)</label>
                                <input class="form-control maxwidth-edit" id="pass" type="password"
                                       autocomplete="new-password">
                            </div>

                            <div class="form-group form-group-label">
                                <div class="checkbox switch">
                                    <label for="is_admin">
                                        <input {if $edit_user->is_admin==1}checked{/if} class="access-hide"
                                               id="is_admin" type="checkbox"><span class="switch-toggle"></span>是否管理员
                                    </label>
                                </div>
                            </div>

                            <div class="form-group form-group-label">
                                <div class="checkbox switch">
                                    <label for="enable">
                                        <input {if $edit_user->enable==1}checked{/if} class="access-hide" id="enable"
                                               type="checkbox"><span class="switch-toggle"></span>用户启用
                                    </label>
                                </div>
                            </div>


                            <div class="form-group form-group-label">
                                <label class="floating-label" for="money">金钱</label>
                                <input class="form-control maxwidth-edit" id="money" type="text"
                                       value="{$edit_user->money}">
                            </div>
                        </div>
                    </div>
                </div>

				<div class="card">
					<div class="card-main">
						<div class="card-inner">

                            <div class="form-group form-group-label">
                                <div class="checkbox switch">
                                    <label for="agent">
                                        <input {if $edit_user->agent==1}checked{/if} class="access-hide" id="agent" type="checkbox"><span class="switch-toggle"></span>是否代理商
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="commission">返利余额</label>
                                <input class="form-control maxwidth-edit" id="commission" type="text" value="{$edit_user->commission}">
                                <p class="form-control-guide"><i class="material-icons">info</i>适用于所有用户, 包括代理商</p>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="rebate">返利百分比</label>
                                <input class="form-control maxwidth-edit" id="rebate" type="text" value="{$edit_user->rebate}">
                                <p class="form-control-guide"><i class="material-icons">info</i>仅适用于销售代理;  -1 按销售代理设置的返利百分比进行返利, 其他为相应的比例</p>
                            </div>

						</div>
					</div>
				</div>

				<div class="card">
					<div class="card-main">
						<div class="card-inner">

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="ban_time">手动封禁时长 (分钟)，不封禁不要修改</label>
                                <input class="form-control maxwidth-edit" id="ban_time" type="text"
                                       value="0">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="last_detect_ban_time">最后一次被封禁的时间</label>
                                <input class="form-control maxwidth-edit" id="last_detect_ban_time" type="text"
                                       value="{$edit_user->last_detect_ban_time()}" readonly>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="relieve_time">当前解封时间</label>
                                <input class="form-control maxwidth-edit" id="relieve_time" type="text"
                                       value="{$edit_user->relieve_time()}" readonly>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="detect_ban_number">累计封禁次数</label>
                                <input class="form-control maxwidth-edit" id="detect_ban_number" type="text"
                                       value="{if $edit_user->detect_ban_number()==0}标杆用户，没有被封禁过耶{else}太坏了，这位用户累计被封禁过 {$edit_user->detect_ban_number()} 次呢{/if}" readonly>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="all_detect_number">累计违规次数</label>
                                <input class="form-control maxwidth-edit" id="all_detect_number" type="text"
                                       value="{$edit_user->all_detect_number}" readonly>
                            </div>

						</div>
					</div>
				</div>

                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="passwd">连接密码</label>
                                <input class="form-control maxwidth-edit" id="passwd" type="text"
                                       value="{$edit_user->passwd}">
                            </div>
                            
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="passwd">VMESS/TROJAN UUID</label>
                                <input class="form-control maxwidth-edit" id="uuid" type="text"
                                       value="{$edit_user->uuid}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="method">自定义加密</label>
                                <input class="form-control maxwidth-edit" id="method" type="text"
                                       value="{$edit_user->method}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="protocol">自定义协议</label>
                                <input class="form-control maxwidth-edit" id="protocol" type="text"
                                       value="{$edit_user->protocol}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="protocol_param">自定义协议参数</label>
                                <input class="form-control maxwidth-edit" id="protocol_param" type="text"
                                       value="{$edit_user->protocol_param}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="obfs">自定义混淆方式</label>
                                <input class="form-control maxwidth-edit" id="obfs" type="text"
                                       value="{$edit_user->obfs}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="obfs_param">自定义混淆参数</label>
                                <input class="form-control maxwidth-edit" id="obfs_param" type="text"
                                       value="{$edit_user->obfs_param}">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="transfer_enable">总流量（GB）</label>
                                <input class="form-control maxwidth-edit" id="transfer_enable" type="text"
                                       value="{$edit_user->enableTrafficInGB()}">
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="usedTraffic">已用流量</label>
                                <input class="form-control maxwidth-edit" id="usedTraffic" type="text"
                                       value="{$edit_user->usedTraffic()}" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="ref_by">邀请人ID</label>
                                <input class="form-control maxwidth-edit" id="ref_by" type="text"
                                       value="{$edit_user->ref_by}" readonly>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">
                            <div class="form-group form-group-label">
                                <label class="floating-label" for="group">用户群组</label>
                                <input class="form-control maxwidth-edit" id="group" type="number"
                                       value="{$edit_user->node_group}">
                                <p class="form-control-guide"><i class="material-icons">info</i>用户只能访问到组别等于这个数字或0的节点</p>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="class">用户级别</label>
                                <input class="form-control maxwidth-edit" id="class" type="number"
                                       value="{$edit_user->class}">
                                <p class="form-control-guide"><i class="material-icons">info</i>用户只能访问到等级小于等于这个数字的节点</p>
                            </div>


                            <div class="form-group form-group-label">
                                <label class="floating-label" for="class_expire">用户等级过期时间</label>
                                <input class="form-control maxwidth-edit" id="class_expire" type="text"
                                       value="{$edit_user->class_expire}">
                                <p class="form-control-guide"><i class="material-icons">info</i>不过期就请不要动</p>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="expire_in">用户账户过期时间</label>
                                <input class="form-control maxwidth-edit" id="expire_in" type="text"
                                       value="{$edit_user->expire_in}">
                                <p class="form-control-guide"><i class="material-icons">info</i>不过期就请不要动</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="node_speedlimit">用户限速，用户在每个节点所享受到的速度(Mbps)</label>
                                <input class="form-control maxwidth-edit" id="node_speedlimit" type="text"
                                       value="{$edit_user->node_speedlimit}">
                                <p class="form-control-guide"><i class="material-icons">info</i>0 为不限制</p>
                            </div>

                            <div class="form-group form-group-label">
                                <label class="floating-label" for="node_connector">用户同时连接 IP 数</label>
                                <input class="form-control maxwidth-edit" id="node_connector" type="text"
                                       value="{$edit_user->node_connector}">
                                <p class="form-control-guide"><i class="material-icons">info</i>0 为不限制</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="card">
                    <div class="card-main">
                        <div class="card-inner">

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-10 col-md-push-1">
                                        <button id="submit" type="submit"
                                                class="btn btn-block btn-brand waves-attach waves-light">修改
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {include file='dialog.tpl'}
        </div>


    </div>
</main>


{include file='admin/footer.tpl'}


<script>
    //document.getElementById("class_expire").value="{$edit_user->class_expire}";

    window.addEventListener('load', () => {
        function submit() {
            if (document.getElementById('is_admin').checked) {
                var is_admin = 1;
            } else {
                var is_admin = 0;
            }

            if (document.getElementById('enable').checked) {
                var enable = 1;
            } else {
                var enable = 0;
            }

            if (document.getElementById('agent').checked) {
                var agent = 1;
            } else {
                var agent = 0;
            }

            $.ajax({
                type: "PUT",
                url: "/admin/user/{$edit_user->id}",
                dataType: "json",
                data: {
                    email: $$getValue('email'),
                    pass: $$getValue('pass'),
                    group: $$getValue('group'),
                    passwd: $$getValue('passwd'),
                    uuid: $$getValue('uuid'),
                    transfer_enable: $$getValue('transfer_enable'),
                    node_speedlimit: $$getValue('node_speedlimit'),
                    method: $$getValue('method'),
                    remark: $$getValue('remark'),
                    name: $$getValue('name'),
                    money: $$getValue('money'),
                    agent,
                    commission: $$getValue('commission'),
                    rebate: $$getValue('rebate'),
                    enable,
                    is_admin,
                    ban_time: $$getValue('ban_time'),
                    ref_by: $$getValue('ref_by'),
                    class: $$getValue('class'),
                    class_expire: $$getValue('class_expire'),
                    expire_in: $$getValue('expire_in'),
                    node_connector: $$getValue('node_connector'),
                    protocol: $$getValue('protocol'),
                    protocol_param: $$getValue('protocol_param'),
                    obfs: $$getValue('obfs'),
                    obfs_param: $$getValue('obfs_param'),
                },
                success: data => {
                    if (data.ret) {
                        $("#result").modal();
                        $$.getElementById('msg').innerHTML = data.msg;
                        window.setTimeout("location.href=top.document.referrer", {$config['jump_delay']});
                    } else {
                        $("#result").modal();
                        $$.getElementById('msg').innerHTML = data.msg;
                    }
                },
                error: jqXHR => {
                    $("#result").modal();
                    $$.getElementById('msg').innerHTML = `发生错误：${
                            jqXHR.status
                            }`;
                }
            });
        }

        $("html").keydown(event => {
            if (event.keyCode == 13) {
                submit();
            }
        });

        $$.getElementById('submit').addEventListener('click', submit);

    })
</script>