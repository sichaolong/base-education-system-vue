const Mock = require('mockjs')

const data = Mock.mock({
  form: {
		part1: {
			XingMing: '@cname',
			ChuShengNianYue: '@date("yyyy年MM月dd日")',
			'XingBie|1': ['男','女'],
			'ZhengZhiMianMao|1': ['共青团员','共产党员','群众'],
			XueWei: '@cword(2,3)',
			ShouYuDanWei: '@cword(2,5)',
			ShouYuShiJian: '@date("yyyy年MM月dd日")',
			GaoXiaoJiaoLing: '2',
			ZhiCheng: '@cword(2,5)',
			XingZhengZhiWu: '@cword(2,5)',
			RenZhiShiJian: '@cword(2,5)',
			GangWeiJinTie: '@cword(2,5)',
			Jin2XueNianRenJiaoKeCheng: '@cword(2,5)',
			NianJunJiaoXueGongZuoLiang: '@cword(2,5)',
			ZhuYaoJiaoXueYeJi: '@cparagraph(1,3)',
		},
		part2: {
			'members|1-10': [{
				XingMing: '@cname',
				ChuShengNianYue: '@date("yyyy年MM月dd日")',
				'XingBie|1': ['男','女'],
				'ZhengZhiMianMao|1': ['共青团员','共产党员','群众'],
				ZuiZhongXueWei: '@cword(2,3)',
				ZhiCheng: '@cword(2,3)',
				XingZhengZhiWu: '@cword(2,3)',
				GaoXiaoJiaoLing: '2',
				Jin2XueNianRenJiaoKeCheng: '@cword(5,8)'
			}]
		},
		part3: {
			GuiZhangZhiDuJianShe: {
				JiBenGuanLiZhiDu: '@cparagraph(1, 3)',
				FaZhanMuBiao: '@cparagraph(1, 3)',
				BenXueNianNianDuJiHua: '@cparagraph(1, 3)',
			},
			DuiWuJianShe: {
				ShiDeJianShe: '@cparagraph(1, 3)',
				TuanDuiJieGou: '@cparagraph(1, 3)',
				JiaoShiChuanBangDaiJiZhi: '@cparagraph(1, 3)',
				ShuangShiXingJiaoShiJianShe: '@cparagraph(1, 3)',
				tables: [[]],
				dialogVisible: [false],
			},
			JiaoXueZuZhi: {
				JiaoShiZongShu: '@cparagraph(1, 3)',
				ChengDanKeCheng: '@cparagraph(1, 3)',
				RenJunZhouXueShi: '@cparagraph(1, 3)',
				RenJunZhiDaoBiYeLunWen: '@cparagraph(1, 3)',
				JiaoXueShiGu: '@cparagraph(1, 3)',
				ZongHePingJiaoYouXiuYiShang: '@cparagraph(1, 3)',
				JiaoXueJiHua: '@cparagraph(1, 3)',
				KeTangJiaoXue: '@cparagraph(1, 3)',
				JiaoXueYunXing: '@cparagraph(1, 3)',
				JiaoXuePingJiaQingKuang: '@cparagraph(1, 3)',
				tables: [[]],
				dialogVisible: [false],
			},
			KeChengJiaoCaiGaiShu: {
				KeChengTiXiJianShe: '@cparagraph(1, 3)',
				KeChengBiaoZhunZhiXing: '@cparagraph(1, 3)',
				JianCaiJianShe: '@cparagraph(1, 3)',
				ZaiXianKaiFangKeChengJianYi: '@cparagraph(1, 3)',
				tables: [[], []],
				dialogVisible: [false, false],
			},
			JiaoXueYanJiu: {
				JiaoGaiXiangMuHeJiaoYanLunWen: '@cparagraph(1, 3)',
				JiaoYanHuoDongHeTingPingKe: '@cparagraph(1, 3)',
				tables: [[], []],
				dialogVisible: [false, false],
			},
			ZhuanYeJianShe: {
				ZhuanYeJianSheGuiHua: '@cparagraph(1, 3)',
				RenCaiPeiYangFangAnXiuDingLuoShi: '@cparagraph(1, 3)',
				ZhuanYeJiaoXueZhiLiangZhiXingBiaoZhun: '@cparagraph(1, 3)',
				ZhuanYeRenZhengHeZhuanYePingGu: '@cparagraph(1, 3)',
				ZhuanYeMingCheng: '@cparagraph(1, 3)',
				ZhuanYeRenZheng: '@cparagraph(1, 3)',
				ZhuanYePingGu: '@cparagraph(1, 3)',
				HuoDeChengHao: '@cparagraph(1, 3)',
			},
			ShiJianJiaoXue: {
				ShiJianJiaoXue: '@cparagraph(1, 3)',
				ShiYanShiXun: '@cparagraph(1, 3)',
				JiDiJianShe: '@cparagraph(1, 3)',
				ChuangXinChuangYeJiaoYu: '@cparagraph(1, 3)',
				tables: [[]],
				dialogVisible: [false],
			},
			TiaoJianBaoZhang: {
				ZhuanXiangJingFei: '@cparagraph(1, 3)',
				BanGongShiSheShiBaoZhang: '@cparagraph(1, 3)',
				BanGongMianJi: '@cparagraph(1, 3)',
				JiaoXueZiLiaoDangAn: '@cparagraph(1, 3)',
				JiaoShiRenShu: '@cparagraph(1, 3)',
				NianDuYunXingJingFei: '@cparagraph(1, 3)',
				XingZhengBanGongMianJi: '@cparagraph(1, 3)',
				JiaoXueZiLiaoDangAnShiMianJi: '@cparagraph(1, 3)',
				BanGongSheShi: '@cparagraph(1, 3)',
			},
			RenCaiPeiYangNengLi: {
				RenCaiPeiYangNengLi: '@cparagraph(1, 3)',
				XueKeJingSai: '@cparagraph(1, 3)',
				ZhiYeJiNengDaSai: '@cparagraph(1, 3)',
				HuLianWangJia: '@cparagraph(1, 3)',
				ChuangXinChuangYeQingKuang: '@cparagraph(1, 3)',
				FaBiaoLunWen: '@cparagraph(1, 3)',
				tables: [[]],
				dialogVisible: [false],
			},
		},
		part4: {
			JinHouJianSheJiHua: '@cparagraph(1, 3)',
		},
	}
})

module.exports = [
  {
    url: '/vue-admin-template/form',
    type: 'get',
    response: config => {
      const form = data.form
      return {
        code: 20000,
        data: {
          form: form
        }
      }
    }
  }
]
