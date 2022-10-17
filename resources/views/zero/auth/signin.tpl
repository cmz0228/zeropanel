<!DOCTYPE html>
<html lang="en">
	<head><base href="../../../"/>
		<title>{$config['appName']} SignIn</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />		
		<link rel="shortcut icon" href="/favicon.png" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" />
		<link href="/theme/zero/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/theme/zero/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
	</head>
	<body id="kt_body" class="app-blank app-blank bgi-size-cover bgi-position-center bgi-no-repeat">
		<script>var defaultThemeMode = "system"; var themeMode; if ( document.documentElement ) { if ( document.documentElement.hasAttribute("data-theme-mode")) { themeMode = document.documentElement.getAttribute("data-theme-mode"); } else { if ( localStorage.getItem("data-theme") !== null ) { themeMode = localStorage.getItem("data-theme"); } else { themeMode = defaultThemeMode; } } if (themeMode === "system") { themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; } document.documentElement.setAttribute("data-theme", themeMode); }</script>
		<div class="d-flex flex-column flex-root" id="kt_app_root">
			<style>body { background-image: url('/theme/zero/assets/media/auth/bg4.jpg'); } [data-theme="dark"] body { background-image: url('/theme/zero/assets/media/auth/bg4-dark.jpg'); }</style>
			<div class="d-flex flex-column flex-column-fluid flex-lg-row">
				<div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
					<div class="d-flex flex-center flex-lg-start flex-column">
						<a href="#" class="mb-7 fs-3hx fw-bold text-white">{$config['appName']}</a>
						
					</div>
				</div>
				<div class="d-flex flex-center w-lg-50 p-10">
					<div class="card rounded-3 w-md-550px">
						<div class="card-body p-10 p-lg-20">							
							<form class="form w-100" novalidate="novalidate" id="kt_sign_in_form" data-kt-redirect-url="/user" action="#">
								
								<div class="text-center mb-11">
									<h1 class="text-dark fw-bolder mb-3">登入</h1>
								</div>
								<div class="row g-3 mb-9">
									<div class="col-md-6">
										<a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
										<img alt="Logo" src="/theme/zero/assets/media/svg/brand-logos/google-icon.svg" class="h-15px me-3" />Sign in with Google</a>
									</div>
									<div class="col-md-6">
										<a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
										<img alt="Logo" src="/theme/zero/assets/media/svg/brand-logos/apple-black.svg" class="theme-light-show h-15px me-3" />
										<img alt="Logo" src="/theme/zero/assets/media/svg/brand-logos/apple-black-dark.svg" class="theme-dark-show h-15px me-3" />Sign in with Apple</a>
									</div>
								</div>
								<div class="separator separator-content my-14">
									<span class="w-125px text-gray-500 fw-semibold fs-7">使用邮箱登录</span>
								</div>
								<div class="fv-row mb-8">
									<input type="text" placeholder="Email" name="email" autocomplete="off" id="signin-email" data-kt-translate="sign-in-input-email" class="form-control bg-transparent" />
								</div>
								<div class="fv-row mb-7">
									<input type="password" placeholder="Password" name="password" autocomplete="off" id="signin-passwd" data-kt-translate="sign-in-input-password" class="form-control bg-transparent" />
								</div>
								<div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
									<div></div>
									<a href="#" class="link-primary" data-kt-translate="sign-in-forgot-password">忘记密码 ?</a>
								</div>
								<div class="d-grid mb-10">
									<button id="kt_sign_in_submit" class="btn btn-primary">
										<span class="indicator-label" data-kt-translate="sign-in-submit">登入</span>
										<span class="indicator-progress">
											<span data-kt-translate="general-progress">Please wait...</span>
											<span class="spinner-border spinner-border-sm align-middle ms-2"></span>
										</span>
									</button>									
								</div>
								<div class="text-gray-500 text-center fw-semibold fs-6">
									还没有帐号？
									<a class="link-primary" href="/auth/signup">注册</a>
								</div>
							</form>
						</div>
					</div>
				</div>				
			</div>
			<div class="app_footer py-4 d-flex flex-lg-column" id="kt_app_footer">
				<div class="app-container container-fluid d-flex flex-column flex-center py-3">
					<div class="text-white order-2 order-md-1 text-center">
						&copy;<script>document.write(new Date().getFullYear());</script>,&nbsp;<span>{$config["appName"]},&nbsp;Inc.&nbsp;All rights reserved.</span><a class="text-white" href="#">&nbsp;Powered By ZeroBoard</a>
					</div>
				</div>
			</div>
		</div>
		<script src="/theme/zero/assets/plugins/global/plugins.bundle.js"></script>
		<script src="/theme/zero/assets/js/scripts.bundle.js"></script>
		<script src="/js/signin.min.js"></script>
	</body>
</html>