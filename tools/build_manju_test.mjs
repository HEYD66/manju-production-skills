import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/Users/m/Documents/漫剧项目/outputs/manju_test";
await fs.mkdir(outputDir, { recursive: true });

const assetTemplatePath = "D:/保险箱/抽卡/公盘/03教程/美工/资产表模板.xlsx";
const assetOutput = `${outputDir}/茉莉花开_美工资产表_全图版.xlsx`;
const storyboardOutput = `${outputDir}/茉莉花开_分镜提示词表_区块总提示词版.xlsx`;

const peopleRows = [
  ["1_陈千雪", "80年代农村逃亡状态；旧衣湿透沾泥，头发凌乱；30岁左右，清瘦，眼眶泛红，惊恐但清醒坚决；核心身份：省城畜牧局研究专员，被拐后伪装疯癫逃亡。", "测试选段", "", "", ""],
  ["1_小茉莉", "5岁女孩；旧棉衣/旧布衣，脸上雨水和泥点；惊吓后依赖母亲，早熟勇敢；本段从麻袋中获救并随母亲逃亡。", "测试选段", "", "", ""],
  ["1_许诺", "年轻大学生村干部；朴素干部外套被雨淋湿；正直果断，骑摩托救援并掩护母女逃走。", "测试选段", "", "", ""],
  ["1_孙屠户", "粗壮中年屠户；浑身泥水，凶狠暴戾；驾驶拖拉机追捕，手持杀猪刀。", "测试选段", "", "", ""],
  ["1_孙小兵", "成年男性，智力低下；浑身泥水；坐在拖拉机旁跟随追捕，惊恐怕蛾子。", "测试选段", "", "", ""],
  ["1_人贩子", "前情人物；事故/死亡遗留，不作为本段核心出镜资产，可按需要后续补图。", "测试选段前情", "", "", ""],
];

const peopleRowsWithPrompt = peopleRows.map(([name, desc, episodes, artist, reviser, image]) => [
  `masterpiece, best quality, 8k, ultra detailed, photorealistic, 16:9横图，角色设定参考图，turnaround sheet，7格分镜，统一光影，纯白背景，无水印无文字。左侧：正面人物半脸+肩颈特写；中排：正面全身视图、背面全身视图；右上：正面胸像特写、纯侧面胸像特写；右下：四分之三侧面胸像特写、超近距离五官特写（眼睛+嘴唇细节）。专业影棚柔光，均匀布光，无硬阴影，所有视图同一角色，同一服饰，同一发型，对焦清晰，毛发/刺绣/皮肤纹理细节锐利，无AI瑕疵，画面整洁干净，比例协调。角色：${name}。外貌与服装：${desc} 保持该角色后续所有镜头脸型、五官、发型、身高比例、服装颜色和材质一致。`,
  name,
  desc,
  episodes,
  artist,
  reviser,
  image,
]);

const sceneRows = [
  ["1_山林道路_夜外", "暴雨夜，泥泞山路，摩托车灯照亮雨幕；麻袋、事故残留、黑暗树林；用于母女获救和上摩托。", "测试选段", "", "", ""],
  ["1_夜雨山路_夜外", "暴雨山路，泥泞弯道，远处隧道口微光，山壁、草丛、断树；用于摩托与拖拉机追逐、夜蛾趋光反击。", "测试选段", "", "", ""],
  ["1_密林小路_夜外", "树根盘错、泥水、雨幕、昏暗林道；用于许诺摔倒并催促陈千雪逃走。", "测试选段", "", "", ""],
  ["1_长途车站_夜外", "昏黄站灯穿透雨幕，末班大巴、湿滑地面、即将合拢的车门；用于逃生钩子。", "测试选段", "", "", ""],
];

const sceneRowsWithPrompt = sceneRows.map(([name, desc, episodes, artist, reviser, image]) => [
  `真人写实电影感，16:9横图，纯场景空镜，无人物，无动物，无文字无水印，16mm广角镜头，电影级构图，真实材质纹理，8K超清。场景：${name}。场景描述：${desc} 强调空间布局、天气、光源、地面材质、远近层次和可复用背景结构。`,
  name,
  desc,
  episodes,
  artist,
  reviser,
  image,
]);

const propRows = [
  ["1_摩托车", "旧式乡村摩托；雨中泥泞，车灯强光；许诺驾驶，后续被推下山坡吸引夜蛾。", "测试选段", "", "", ""],
  ["1_麻袋", "粗麻袋，湿透；绳口被陈千雪扯开，小茉莉从中获救。", "测试选段", "", "", ""],
  ["1_拖拉机", "拉猪拖拉机；车灯刺眼，铁笼和摇晃钩子；孙屠户驾驶追捕。", "测试选段", "", "", ""],
  ["1_铁钩", "拖拉机铁笼后摇晃的屠宰钩，雨夜反光，强化威胁。", "测试选段", "", "", ""],
  ["1_杀猪刀", "孙屠户挥舞的宽刃刀；金属冷光，危险道具。", "测试选段", "", "", ""],
  ["1_巨大松树", "被山洪冲断，横亘隧道口，堵死去路。", "测试选段", "", "", ""],
  ["1_夜蛾群", "白色夜蛾；因趋光性密集扑向车灯和孙屠户，制造反击。", "测试选段", "", "", ""],
  ["1_树根", "盘错湿滑树根；绊倒许诺。", "测试选段", "", "", ""],
  ["1_长途大巴车门", "末班大巴即将合拢的车门；陈千雪用身体抵住。", "测试选段", "", "", ""],
];

const propRowsWithPrompt = propRows.map(([name, desc, episodes, artist, reviser, image]) => [
  `真人写实电影质感，16:9横图，正视图或正面三分之二构图，完整视角，白色背景，影棚柔光，8K超清，无文字无水印。道具：${name}。道具描述：${desc} 清晰呈现形制结构、材质纹理、磨损痕迹、尺寸感和后续视频中需要保持一致的轮廓特征。`,
  name,
  desc,
  episodes,
  artist,
  reviser,
  image,
]);

async function fillAssetWorkbook() {
  const input = await FileBlob.load(assetTemplatePath);
  const workbook = await SpreadsheetFile.importXlsx(input);
  const assetImageDir = "C:/Users/m/Documents/漫剧项目/outputs/manju_test/generated_assets_full_16x9";
  const sheets = [
    ["人设", ["总提示词（可直接复制给生图模型）", "人设", "人设描述", "出现集数", "出图人", "返修人", "人设图"], peopleRowsWithPrompt, "A2:G7"],
    ["场景", ["总提示词（可直接复制给生图模型）", "场景", "场景描述", "出现集数", "出图人", "返修人", "场景图"], sceneRowsWithPrompt, "A2:G5"],
    ["道具", ["总提示词（可直接复制给生图模型）", "道具", "道具描述", "出现集数", "出图人", "返修人", "道具图"], propRowsWithPrompt, "A2:G10"],
  ];
  for (const [sheetName, headers, rows, range] of sheets) {
    const sheet = workbook.worksheets.getItem(sheetName);
    sheet.showGridLines = false;
    sheet.getRange("A1:G1").values = [headers];
    sheet.getRange(range).values = rows;
    sheet.getRange("A1:G1").format = {
      fill: "#72583D",
      font: { bold: true, color: "#FFFFFF" },
      wrapText: true,
      verticalAlignment: "Center",
    };
    sheet.getRange("A1:G1").format.rowHeight = 28;
    sheet.getRange(`A2:G${rows.length + 1}`).format.rowHeight = 92;
    sheet.getRange(range).format = {
      wrapText: true,
      verticalAlignment: "Top",
      borders: { preset: "all", style: "thin", color: "#D8D2C8" },
    };
    sheet.getRange("A:A").format.columnWidth = 72;
    sheet.getRange("B:B").format.columnWidth = 22;
    sheet.getRange("C:C").format.columnWidth = 60;
    sheet.getRange("D:D").format.columnWidth = 16;
    sheet.getRange("E:F").format.columnWidth = 14;
    sheet.getRange("G:G").format.columnWidth = 18;
    sheet.freezePanes.freezeRows(1);
    sheet.freezePanes.freezeColumns(1);
    try {
      const lastRow = rows.length + 1;
      sheet.tables.add(`A1:G${lastRow}`, true, `${sheetName}表`);
    } catch {}
  }
  const imageMap = {
    "人设": [
      ["G2", `${assetImageDir}/1_陈千雪_7格人设.png`],
      ["G3", `${assetImageDir}/1_小茉莉_安全人设.png`],
      ["G4", `${assetImageDir}/1_许诺_7格人设.png`],
      ["G5", `${assetImageDir}/1_孙屠户_7格人设.png`],
      ["G6", `${assetImageDir}/1_孙小兵_7格人设_痴傻面部加强.png`],
      ["G7", `${assetImageDir}/1_人贩子_7格人设.png`],
    ],
    "场景": [
      ["G2", `${assetImageDir}/1_山林道路_夜外_16x9.png`],
      ["G3", `${assetImageDir}/1_夜雨山路_夜外_16x9.png`],
      ["G4", `${assetImageDir}/1_密林小路_夜外_16x9.png`],
      ["G5", `${assetImageDir}/1_长途车站_夜外_16x9.png`],
    ],
    "道具": [
      ["G2", `${assetImageDir}/1_摩托车_16x9.png`],
      ["G3", `${assetImageDir}/1_麻袋_16x9.png`],
      ["G4", `${assetImageDir}/1_拖拉机_16x9.png`],
      ["G5", `${assetImageDir}/1_铁钩_16x9.png`],
      ["G6", `${assetImageDir}/1_杀猪刀_16x9.png`],
      ["G7", `${assetImageDir}/1_巨大松树_16x9.png`],
      ["G8", `${assetImageDir}/1_夜蛾群_16x9.png`],
      ["G9", `${assetImageDir}/1_树根_16x9.png`],
      ["G10", `${assetImageDir}/1_长途大巴车门_16x9.png`],
    ],
  };
  for (const [sheetName, images] of Object.entries(imageMap)) {
    const sheet = workbook.worksheets.getItem(sheetName);
    for (const [cell, imagePath] of images) {
      const data = await fs.readFile(imagePath);
      const dataUrl = `data:image/png;base64,${data.toString("base64")}`;
      const row = Number(cell.match(/\d+/)[0]) - 1;
      const col = cell.charCodeAt(0) - "A".charCodeAt(0);
      sheet.images.add({
        dataUrl,
        anchor: {
          from: { row, col, rowOffsetPx: 4, colOffsetPx: 4 },
          extent: { widthPx: 92, heightPx: 92 },
        },
      });
    }
  }
  const preview = await workbook.render({ sheetName: "人设", autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/asset_preview.png`, new Uint8Array(await preview.arrayBuffer()));
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(assetOutput);
}

const storyboardHeaders = [
  "总提示词（可直接复制给视频模型）",
  "分镜序号",
  "对应序号的提示词",
  "本块台词",
  "景别",
  "拍摄角度",
  "运镜方式",
  "画面内容/动作",
  "出场人物",
  "场景/站位",
  "音效",
  "时长",
  "备注/检查",
];

const rawStoryboardRows = [
  ["1-1", "中远景低角度，摩托车灯穿透暴雨，陈千雪跌跌撞撞冲向麻袋，许诺急停摩托；Seedance 2.0，竖屏9:16，真人写实，雨夜冷色电影感，无字幕无水印无BGM。", "", "中远景", "低角度平视", "手持轻跟", "车灯照过来，摩托车停在几米外；陈千雪冲向麻袋。", "陈千雪、许诺、小茉莉", "1_山林道路_夜外；陈千雪画面左前，麻袋在脚边，许诺和摩托在右后几米外。", "暴雨声、摩托急刹声、车灯电流声", "0-3s", "区块1，建立场景和救援关系"],
  ["1-2", "近景手部特写，陈千雪颤抖的手扯开湿麻袋绳子，小茉莉露出脸，眼睛惊恐睁大；保持人物和麻袋位置一致。", "小茉莉：妈妈——！", "近景/特写", "平视近距", "快速切近", "陈千雪扯开麻袋，小茉莉从麻袋口露出。", "陈千雪、小茉莉", "陈千雪跪在麻袋旁，小茉莉位于画面下方。", "麻绳摩擦声、雨声", "3-6s", "原台词保留"],
  ["1-3", "半身近景手持跟拍，陈千雪跪在泥水里抱紧女儿，眼泪和雨水混在脸上，身体发抖但双臂护住小茉莉。", "陈千雪：别怕，妈妈在这，妈妈这就带你逃出去！", "半身近景", "平视", "手持跟拍", "母女相拥，陈千雪安抚小茉莉。", "陈千雪、小茉莉", "麻袋旁泥地，摩托车灯从右后方打来。", "雨声、抽泣声", "6-11s", "情绪特写"],
  ["1-4", "过肩中景，从陈千雪肩后看许诺在摩托旁回头催促，许诺一手握把一手指向山路外侧。", "许诺：上车，连夜去车站，这地方不能多待！", "中景/过肩", "平视", "轻推", "许诺催促母女上车。", "许诺、陈千雪、小茉莉", "许诺在右后方摩托旁，陈千雪肩背作前景。", "雨声、摩托怠速声", "11-15s", "区块1结束"],
  ["2-1", "侧面中景跟拍，陈千雪抱起小茉莉跨上摩托，许诺猛拧油门，泥水从后轮甩起。", "", "中景", "侧面平视", "横向跟拍", "陈千雪抱小茉莉上摩托，车辆启动。", "陈千雪、小茉莉、许诺", "1_夜雨山路_夜外；摩托前方偏右。", "油门轰鸣、泥浆飞溅", "0-3s", "区块2开始"],
  ["2-2", "俯拍远景，三人迎着暴雨往山外开去，摩托在泥泞山路上狂奔，雨水和泥点抽在脸上。", "", "远景", "俯拍", "高速跟拍", "摩托车在山路狂奔。", "陈千雪、小茉莉、许诺", "山路纵深，黑暗树林两侧压迫。", "风雨声、轮胎打滑声", "3-6s", "速度感"],
  ["2-3", "后座近景，陈千雪死死抱住小茉莉，许诺迎着风雨大喊；长台词用后座反应镜头承接。", "许诺：过了隧道就是去镇上的大巴站！还有几公里山路，逃出去，就别回头！", "近景", "后座侧后方", "贴身跟拍", "陈千雪回头看后方，许诺喊话。", "陈千雪、小茉莉、许诺", "摩托在前，拖拉机尚未入画。", "雨声、风声、发动机声", "6-10s", "原台词保留"],
  ["2-4", "长焦中远景，拖拉机声音从身后逼近，孙屠户开着拉猪拖拉机冲出，孙小兵坐旁边，铁笼钩子摇晃反光。", "", "中远景", "长焦平视", "压缩跟拍", "拖拉机从雨幕中追上来。", "孙屠户、孙小兵", "拖拉机后方偏左，摩托前方偏右，保持同一轴线。", "拖拉机轰鸣、铁钩碰撞", "10-13s", "反派入场"],
  ["2-5", "低角度近景，孙屠户狰狞探出驾驶位，雨水从脸上流下，手边杀猪刀反光。", "孙屠户：奶奶的，等老子把你们抓回来，全都挂在钩子上，当猪一样放血！", "近景", "低角度", "快速推近", "孙屠户威胁母女。", "孙屠户、孙小兵", "拖拉机驾驶位，铁笼钩子在后景晃动。", "雨声、发动机声", "13-15s", "区块2钩子"],
  ["3-1", "摩托车后视镜特写，孙小兵湿漉漉的脸在镜面中晃动靠近。", "孙小兵：媳、媳妇，别跑了，俺、俺要和你回去困觉，生娃娃……", "特写", "后视镜视角", "稳定近摄", "后视镜里出现孙小兵。", "孙小兵、许诺", "摩托在前，拖拉机在后。", "雨声、发动机声", "0-4s", "原台词保留"],
  ["3-2", "许诺正面近景，镜头贴近车把，他看着后视镜，手指攥紧油门，眼神发狠。", "许诺：祸害活千年！抓紧！", "近景", "正面低机位", "轻微推进", "许诺拧紧油门。", "许诺", "摩托车车把前方，雨水打在脸上。", "油门声、雨声", "4-7s", ""],
  ["3-3", "主观视角快速推进，隧道光亮在雨幕尽头出现，摩托车向光冲去。", "许诺：太好了，出了隧道，就是车站了！", "主观中景", "POV", "快速推进", "隧道口出现希望光亮。", "许诺、陈千雪、小茉莉", "前方隧道口，山路湿滑。", "风雨声", "7-10s", ""],
  ["3-4", "快速拉出中远景，地动山摇，巨大松树横亘隧道口，摩托车急刹，三人摔倒在泥地里。", "", "中远景", "平视转俯角", "快速拉出", "断树堵死隧道口，摩托急刹摔倒。", "许诺、陈千雪、小茉莉", "巨大松树横向堵在隧道口。", "急刹声、树干断裂余响、摔泥声", "10-13s", "动作逻辑"],
  ["3-5", "泥地近景，许诺撑起上半身回头，身后拖拉机车灯越来越近。", "许诺：遭了！追上来了！", "近景", "低机位", "回头甩镜", "许诺发现拖拉机追近。", "许诺、陈千雪、小茉莉", "三人摔在摩托旁，拖拉机灯在后方逼近。", "拖拉机轰鸣、雨声", "13-15s", "区块3结束"],
  ["4-1", "微距特写，一只湿漉漉的夜蛾从草丛跌跌撞撞飞起，扑到陈千雪脸上，翅膀贴着雨水颤动。", "", "微距特写", "平视近距", "微距缓推", "夜蛾落到陈千雪脸上。", "陈千雪、夜蛾", "草丛在左前，陈千雪扶摩托站起。", "雨声、微弱扑翅声", "0-3s", "科学反击触发点"],
  ["4-2", "陈千雪近景，雨水顺脸流下，她盯着夜蛾，眼神从恐惧变成判断，扶着摩托站稳。", "陈千雪：夜蛾……趋光性……我们把摩托车推下去！", "近景", "平视", "缓慢推近", "陈千雪做出判断。", "陈千雪、小茉莉", "陈千雪在摩托旁，小茉莉在身后。", "雨声、喘息声", "3-7s", "原台词保留"],
  ["4-3", "双人中景，许诺愣一秒后立刻搭把手，两人从同一侧推摩托，陈千雪回头确认小茉莉位置。", "许诺：夜蛾有“趋光性”，会围绕着光源疯狂扑上去！", "中景", "侧面平视", "横移跟拍", "许诺协助推摩托。", "陈千雪、许诺、小茉莉", "两人同侧推车，小茉莉在安全后方。", "雨声、摩托金属摩擦声", "7-10s", ""],
  ["4-4", "俯拍广角，摩托车翻滚坠下山坡，车灯乱晃，白色夜蛾从草丛和林间铺天盖地飞起。", "", "广角远景", "俯拍", "俯冲跟随", "摩托坠坡，夜蛾群飞起。", "陈千雪、许诺、小茉莉、夜蛾群", "坡下车灯成为光源，拖拉机在后。", "金属翻滚声、泥石滑落、扑翅声", "10-13s", "大场面"],
  ["4-5", "拖拉机前挡风近景，数百只蛾子朝车灯和孙屠户脸上撞去。", "", "近景", "车前低角度", "快速切近", "夜蛾撞击孙屠户和车灯。", "孙屠户、孙小兵、夜蛾群", "拖拉机正面，车灯强光。", "噗！噗！噗！密集撞击声", "13-15s", "区块4结束"],
  ["5-1", "低角度近景，孙屠户被蛾子撞得睁不开眼，挥舞杀猪刀，刀刃划过雨幕。", "孙屠户：啊——！滚开！滚开！", "近景", "低角度", "晃动手持", "孙屠户挥刀驱赶夜蛾。", "孙屠户、夜蛾群", "拖拉机驾驶位。", "雨声、扑翅声、刀刃破风声", "0-3s", ""],
  ["5-2", "孙小兵半身近景，抱着头缩在座位上，白蛾扑满肩膀和脸侧。", "孙小兵：爹！蛾子！蛾子吃人啦！", "半身近景", "平视", "快速切换", "孙小兵惊恐抱头。", "孙小兵、夜蛾群", "拖拉机副位。", "嚎叫声、扑翅声", "3-5s", ""],
  ["5-3", "中远景，失控拖拉机一头撞在旁边山壁上，车头瘪进去，灯光抖动后熄火。", "", "中远景", "侧面平视", "跟拍急停", "拖拉机撞山壁熄火。", "孙屠户、孙小兵", "山壁在画面右侧，拖拉机车头撞入。", "撞击声、金属变形、熄火声", "5-7s", ""],
  ["5-4", "陈千雪中景，雨水打在脸上，她迅速指向一条小路，小茉莉贴在怀里。", "陈千雪：走那边！", "中景", "平视", "快速摇向小路", "陈千雪指路。", "陈千雪、小茉莉、许诺", "小路入口在画面右侧。", "雨声、喘息声", "7-9s", ""],
  ["5-5", "手持跟拍，陈千雪抱着小茉莉，许诺在前，两人一前一后冲进小路，树枝扫过镜头。", "", "中景", "背后跟拍", "手持跟拍", "三人冲入密林小路。", "陈千雪、小茉莉、许诺", "1_密林小路_夜外，树枝形成前景遮挡。", "急促脚步、树枝刮擦", "9-12s", ""],
  ["5-6", "低机位近景，许诺脚下一滑，被盘错树根绊倒，整个人砸进泥里，陈千雪立刻回头伸手拉她。", "", "近景", "低机位", "快速下坠跟拍", "许诺被树根绊倒。", "许诺、陈千雪、小茉莉", "湿滑树根横在脚前。", "踩滑声、摔泥声", "12-15s", "区块5结束"],
  ["6-1", "双人近景，陈千雪回头拉许诺，许诺抱着脚腕，另一只手用力推开陈千雪。", "许诺：别管我！我是村干部，他们不敢把我怎么样！你快走！", "双人近景", "平视", "正反打", "许诺推开陈千雪，催她走。", "许诺、陈千雪、小茉莉", "许诺倒在左前泥地，陈千雪抱小茉莉在右侧。", "雨声、喘息声", "0-4s", "原台词保留"],
  ["6-2", "正反打近景，陈千雪脚步一顿回头看许诺，眼眶发红；许诺抬头盯住她，声音更重。", "许诺：跑啊！难道你还想再被抓回去，一辈子关在猪圈里吗！", "近景", "平视", "正反打", "陈千雪犹豫，许诺喊醒她。", "许诺、陈千雪、小茉莉", "密林小路，雨水遮挡背景。", "雨声、远处追赶声", "4-8s", ""],
  ["6-3", "陈千雪特写，她流着泪，抱紧小茉莉转身往前跑，嘴唇紧抿没有回头。", "许诺：跑啊！一定要逃出去——！", "特写", "侧面平视", "后退跟拍", "陈千雪转身奔跑。", "陈千雪、小茉莉、许诺", "许诺留在后方，声音被雨拉远。", "雨声、脚步声", "8-10s", ""],
  ["6-4", "后退揭示镜头，陈千雪抱着小茉莉冲出密林，前方长途车站灯光穿透雨幕，一片昏黄。", "", "中远景", "正面后退", "后退揭示", "陈千雪冲出密林看见车站。", "陈千雪、小茉莉", "1_长途车站_夜外，站灯昏黄。", "雨声减弱、大巴发动机声", "10-13s", "转场"],
  ["6-5", "低角度中景，陈千雪冲向大巴，用身体死死抵住即将合拢的车门。", "陈千雪：师傅！等等！", "中景", "低角度", "快速推近", "陈千雪抵住大巴车门。", "陈千雪、小茉莉", "大巴车门在画面右侧合拢，陈千雪肩膀顶门。", "车门声、雨声、发动机声", "13-15s", "区块6钩子"],
];

const projectPrefix = "Seedance 2.0，竖屏9:16，真人写实电影感，80年代中国偏远山村雨夜逃亡，低饱和冷色调，真实雨水、泥泞、车灯逆光、湿润皮肤和衣物质感，保持人物面貌特征、服装颜色、发型、身高比例、道具形状、场景布局在所有分镜中一致。禁止出现字幕，禁止出现任何文字、水印、logo，不添加BGM，只保留环境音效和角色台词。";

const storyboardRows = rawStoryboardRows.map((row) => ["", ...row]);

const blockGroups = new Map();
for (const row of rawStoryboardRows) {
  const [seq] = row;
  const block = seq.split("-")[0];
  if (!blockGroups.has(block)) blockGroups.set(block, []);
  blockGroups.get(block).push(row);
}

const blockTotalPrompts = new Map();
for (const [block, rows] of blockGroups.entries()) {
  const first = rows[0];
  const last = rows[rows.length - 1];
  const scenes = [...new Set(rows.map((r) => r[8]).filter(Boolean))].join("；");
  const characters = [...new Set(rows.flatMap((r) => r[7].split("、")).map((x) => x.trim()).filter(Boolean))].join("、");
  const shotLines = rows.map((r) => {
    const [seq, prompt, dialogue, shotSize, angle, cameraMove, action, , , sfx, duration] = r;
    return `${seq}（${duration}）：${shotSize}，${angle}，${cameraMove}。${action}${dialogue ? ` 台词：${dialogue}` : ""}${sfx ? ` 音效：${sfx}。` : ""} 提示词：${prompt}`;
  }).join("\n");
  const totalPrompt = [
    projectPrefix,
    `第${block}镜/区块，总时长0-15秒。`,
    `场景/站位：${scenes}`,
    `出场人物：${characters}。`,
    "镜头时序：",
    shotLines,
    `结尾状态：${last[6]}`,
    "要求：同一镜内人物脸型、服装、站位、道具、雨夜光线连续一致；禁止越轴和跳轴；所有台词严格按原文呈现。"
  ].join("\n");
  blockTotalPrompts.set(block, totalPrompt);
}

async function buildStoryboardWorkbook() {
  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add("第1集-测试选段");
  sheet.showGridLines = false;
  sheet.getRange("A1:M1").merge();
  sheet.getRange("A1").values = [["《茉莉花开时》分镜提示词表｜竖屏9:16｜真人写实｜Seedance 2.0｜原台词严格保留"]];
  sheet.getRange("A1:M1").format = {
    fill: "#1F4E5F",
    font: { bold: true, color: "#FFFFFF", size: 14 },
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
  };
  sheet.getRange("A2:M2").values = [storyboardHeaders];
  sheet.getRange("A2:M2").format = {
    fill: "#6B8E23",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    borders: { preset: "all", style: "thin", color: "#E5E7EB" },
  };
  sheet.getRangeByIndexes(2, 0, storyboardRows.length, storyboardHeaders.length).values = storyboardRows;
  const dataRange = sheet.getRangeByIndexes(2, 0, storyboardRows.length, storyboardHeaders.length);
  dataRange.format = {
    wrapText: true,
    verticalAlignment: "Top",
    borders: { preset: "all", style: "thin", color: "#D9E2D0" },
  };
  sheet.getRange("A:A").format.columnWidth = 72;
  sheet.getRange("B:B").format.columnWidth = 10;
  sheet.getRange("C:C").format.columnWidth = 50;
  sheet.getRange("D:D").format.columnWidth = 30;
  sheet.getRange("E:G").format.columnWidth = 14;
  sheet.getRange("H:H").format.columnWidth = 30;
  sheet.getRange("I:I").format.columnWidth = 22;
  sheet.getRange("J:J").format.columnWidth = 34;
  sheet.getRange("K:K").format.columnWidth = 22;
  sheet.getRange("L:L").format.columnWidth = 10;
  sheet.getRange("M:M").format.columnWidth = 20;
  sheet.getRange("A1:M1").format.rowHeight = 30;
  sheet.getRange("A2:M2").format.rowHeight = 36;
  sheet.getRange(`A3:M${storyboardRows.length + 2}`).format.rowHeight = 110;
  sheet.freezePanes.freezeRows(2);
  sheet.freezePanes.freezeColumns(1);
  let startRow = 3;
  for (const [block, rows] of blockGroups.entries()) {
    const endRow = startRow + rows.length - 1;
    const rangeAddress = `A${startRow}:A${endRow}`;
    const blockRange = sheet.getRange(rangeAddress);
    if (rows.length > 1) blockRange.merge();
    sheet.getRange(`A${startRow}`).values = [[blockTotalPrompts.get(block)]];
    sheet.getRange(rangeAddress).format = {
      wrapText: true,
      verticalAlignment: "Top",
      fill: block === "1" || block === "3" || block === "5" ? "#E8F4F8" : "#F7FBF2",
      borders: { preset: "all", style: "thin", color: "#8BB9C9" },
    };
    startRow = endRow + 1;
  }

  const preview = await workbook.render({ sheetName: "第1集-测试选段", range: "A1:M10", scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/storyboard_preview.png`, new Uint8Array(await preview.arrayBuffer()));
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(storyboardOutput);
}

await fillAssetWorkbook();
// await buildStoryboardWorkbook();

console.log(JSON.stringify({ assetOutput, storyboardOutput }, null, 2));
