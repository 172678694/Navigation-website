
		//1、初始化变量
		var hashA = init()
		var keys = hashA["keys"]
		var hash = hashA["hash"]




		//2、生成键盘
		generateKeyboard(keys, hash)


		//3、监听键盘
		listenToUser(hash)



		//下面是工具函数
		function init() {
			var keys = {
				0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
				1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
				2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
				length: 3
			}
			var hash = {
				'q': 'qq.com',
				'w': 'weibo.com',
				'e': 'ele.com',
				'r': 'renren.com',
				't': 'tianya.com',
				'y': 'youtube.com',
				'u': 'uc.com',
				'i': 'iqiyi.com',
				'o': 'opera.com',
				'p': undefined,
				'k': undefined,
				'a': 'acfun.com',
				's': 'sohu.com',
				'z': 'zhihu.com',
				'm': 'www.mcdonalds.com.cn'
			}
			//取出localStorage的uuu对应的hash
			var hashInlocalStorage = getFromLocalStorage('uuu')
			if (hashInlocalStorage) {
				hash = hashInlocalStorage
			}
			return {
				'keys': keys,
				'hash': hash
			}
		}

		function generateKeyboard(keys, hash) {
			for (var index = 0; index < keys['length']; index = index + 1) {
				var div = tag('div', { className: 'row' })

				main.appendChild(div)

				var row = keys[index] //第一个数组 第二个数组 第三个数组
				for (var index2 = 0; index2 < row.length; index2 = index2 + 1) {

					var span = createSpan(row[index2])
					var img = createImage(hash[row[index2]])
					var button = createButton(row[index2])

					var kbd = tag('kbd', { className: 'key' })
					kbd.appendChild(span)
					kbd.appendChild(img)
					kbd.appendChild(button)
					div.appendChild(kbd)
				}
			}
		}

		function listenToUser(hash) {
			document.onkeypress = function (jdwaodklasdk) {
				var key = jdwaodklasdk['key']
				var website = hash[key]
				//location.href='http://'+ website
				window.open('http://' + website, '_blank')
			}
		}


		function getFromLocalStorage(name) {
			return JSON.parse(localStorage.getItem(name) || 'null')
		}


		function createSpan(textContent) {
			var span = tag('span', { className: 'text' })
			span.textContent = textContent
			return span
		}

		function createImage(domain) {
			var img = tag('img')
			if (domain) {
				img.src = 'http://' + domain + '/favicon.ico'
			} else {
				img.src = '//i.loli.net/2018/05/27/5b0a2d32b703a.png'
			}
			img.onerror = function (xxx) {
				xxx.target.src = '//i.loli.net/2018/05/27/5b0a2d32b703a.png'
			}
			return img
		}

		function createButton(id) {
			var button = tag('button')
			button.textContent = '编辑'
			button.id = id

			button.onclick = function (jdwaodklasdk) {
				var button2 = jdwaodklasdk.target
				console.log(jdwaodklasdk.target)
				var img2 = button2['previousSibling']
				var key = button2.id
				var x = prompt('给我一个网址')
				if (x) {
					hash[key] = x
					// img2.src='http://'+x +'/favicon.ico'
					img2.src = 'http://' + x + '/favicon.ico'
					img2.onerror = function (xxx) {
						xxx.target.src = '//i.loli.net/2018/05/27/5b0a2d32b703a.png'
					}
					localStorage.setItem('uuu', JSON.stringify(hash))
				}
				console.log(hash)
			}
			return button
		}

		//提供标签名和一个属性列表，返回对应的element
		function tag(tagName, attributes) {
			element = document.createElement(tagName)
			for (var key in attributes) {
				element[key] = attributes[key]
			}
			return element
		}

