---
name: manju-art-assets
description: Build AI comic-drama/manju art production assets from Chinese scripts. Use when the user asks for 美工, 资产表, 剧本拆解, 人设, 场景, 道具, 三视图, 面部特写, 生图提示词, character/scene/prop prompts, asset IDs, wardrobe tracking, scene state separation, or visual consistency checks before AI image/video generation.
---

# Manju Art Assets

## Goal

Turn a script into a clean asset system for AI image generation and later video generation: characters, wardrobe variants, interactive props, and scenes with day/night and interior/exterior states separated.

## Project Intake

Before extracting or generating assets, ask for missing project information. Do not start asset production immediately unless the user already provided enough answers.

Ask concise questions covering:

- Story genre and era: ancient, modern, fantasy, urban, campus, sci-fi, game system, etc.
- Visual style: realistic live-action, anime, Chinese comic, Korean comic, 3D/CG, next-generation/PBR.
- Target image tools: Jimeng, Midjourney, Stable Diffusion, RunningHub workflow, or other.
- Asset scope: only first episode, first ten episodes, full season, or selected characters/scenes/props.
- Asset output needed: extraction table only, prompts only, three-view prompts, face close-ups, scene multi-angle prompts, or all.
- Naming preference: whether to follow first-appearance numeric IDs exactly.
- Existing materials: script, reference images, previous character designs, scene boards, brand style, or asset table.
- Cost/quality priority: fast draft, balanced, or high-consistency production assets.

Then proceed with extraction and prompt generation.

## Asset Extraction

Read the full script and build a global memory of first appearance, wardrobe, props, and scene states.

Extract by episode:

- Characters: classify as `[主要]`, `[次要]`, or `[龙套]`.
- Wardrobe: keep clothing concise. If a character changes outfit, create a new visual asset ID and mark relation to the original.
- Props: include only items with interaction, close-up, plot function, or repeated visual importance. Do not count passive background furniture unless it is treated as a prop.
- Scenes: separate the same physical space into distinct assets for `日内`, `日外`, `夜内`, and `夜外`.

Use first-appearance IDs:

```text
1_角色A
5_角色A(换休闲装，本人同1_角色A)
1_废弃工厂_夜外
5_废弃工厂_日外(物理空间同1_废弃工厂)
1_道具名
```

When an existing asset reappears, reuse the same ID and add `(同第X集)`.

## Asset Table Format

For long scripts, output ten episodes per batch unless the user asks otherwise.

When delivering an Excel/table asset workflow, put a copy-ready image prompt first. The first column must be a complete prompt that can be pasted directly into the image model; the later columns are for production management, assignment, review, and asset tracking.

Recommended character sheet columns:

```text
总提示词（可直接复制给生图模型）
人设
人设描述
出现集数
出图人
返修人
人设图
```

Recommended scene sheet columns:

```text
总提示词（可直接复制给生图模型）
场景
场景描述
出现集数
出图人
返修人
场景图
```

Recommended prop sheet columns:

```text
总提示词（可直接复制给生图模型）
道具
道具描述
出现集数
出图人
返修人
道具图
```

```markdown
| 总提示词（可直接复制给生图模型） | 人设 | 人设描述 | 出现集数 | 出图人 | 返修人 | 人设图 |
|---|---|---|---|---|---|---|
| 全身正面照，真人写实电影质感... | 1_角色A | 黑西装，冷峻气质... | 第1集 |  |  |  |
```

When asked for a consolidated table, use:

```markdown
| 角色 | 道具 | 场景 |
|---|---|---|
| 1-10&14-16 李富贵（黑色西装，墨镜） | 1-5&14 李云龙的剑（银色剑身，黑色剑柄） | 1-10 台儿庄_日外（破旧村庄） |
```

## Character Prompts

Use for 人设, 三视图, face reference, or wardrobe variants.

Default image format:

- Use 16:9 horizontal images for all art assets unless the user explicitly asks otherwise.
- Character assets should default to a horizontal character reference sheet, not a single vertical portrait.
- Use a pure white background, unified soft studio lighting, no watermark, no text, no UI marks.
- Preserve the same character, same face, same hairstyle, same outfit, and same lighting across all panels.
- Keep proportions coordinated, focus sharp, and avoid AI artifacts in hands, eyes, hair, fabric, embroidery, and skin texture.

Default character reference sheet layout:

```text
masterpiece, best quality, 8k, ultra detailed, photorealistic,
角色设定参考图，turnaround sheet，7格分镜，统一光影，纯白背景，无水印无文字，
左侧：正面人物半脸+肩颈特写，
中排：正面全身视图、背面全身视图，
右上：正面胸像特写、纯侧面胸像特写，
右下：四分之三侧面胸像特写、超近距离五官特写（眼睛+嘴唇细节），
专业影棚柔光，均匀布光，无硬阴影，所有视图同一角色，同一服饰，同一发型，
对焦清晰，毛发/刺绣/皮肤纹理细节锐利，无AI瑕疵，画面整洁干净，比例协调
```

Output:

```text
【角色分析报告】：角色名
身份定位：
核心人设：
首次出场：
面部特征：
体态特征：
服饰细节：
原文考据/推理：
AI绘画中文提示词：
(视角)全身，正面照。...
```

For realistic style, use cinematic photorealism, 8K, RAW photo feel, detailed skin texture, soft film lighting.

For anime/CG assets, replace photorealistic language with: next-generation material, PBR skin/materials, ultra-detailed, fine texture, 45-degree side light, rim light, Unreal Engine 5 render, OC render.

For 三视图 or character reference sheets, request the 7-panel horizontal layout above unless the user provides another layout reference. Keep proportions, facial features, hairstyle, clothing folds, and accessories consistent.

## Scene Prompts

Use pure environment prompts:

- No humans, animals, monsters, or living entities.
- Convert character actions into environmental traces where useful: empty chair, steaming tea, open door, scattered papers.
- Prefer wide, ultra-wide, long shot, extreme long shot, aerial, or grand establishing view.
- Include physical materials, architecture, layout, lighting, weather, atmosphere, depth, and core visual elements.
- Keep day/night and interior/exterior state explicit.
- Use 16:9 horizontal wide scene assets by default. Scene assets are for background/reference production, while video storyboard prompts may still be vertical 9:16.

Output:

```text
场景分析：场景名
对应集数/章节：
原文描写锚点：
视觉推导与构图思路：
中文写实风格提示词（纯场景版）：
核心负向提示：空无一人，无人，纯风景，无文字，无水印
镜头语言：
建筑布局与材质：
光影与氛围：
```

## Prop Prompts

Use for weapons, tokens, letters, devices, medicine, books, rings, keys, and plot objects.

Use 16:9 horizontal prop assets by default. Place the full object centered on a pure white background with enough padding, front view or front three-quarter view, complete silhouette visible, and no text/watermark.

Output:

```text
[物品名称] 视觉开发方案
1. 设定依据
归属/持有者：
原文线索：
设计推演：
2. 视觉细节
形制结构：
材质与质感：
物理磨损：
3. AI绘画提示词
正视图，正面构图，完整视角，主体描述，材质，磨损细节，电影质感，8k分辨率，白色背景。
```

## QA Checklist

- No missing major/secondary/extra characters.
- Wardrobe changes get new IDs; unchanged outfits reuse IDs.
- Same physical scene gets separate IDs for day/night and interior/exterior.
- Props are useful interactive/close-up assets, not random decoration.
- Prompts are concrete, visual, and generation-ready.
- Character prompt has empty hands and white background unless the user asks otherwise.
- Scene prompt contains no people or living entities.
- Asset names remain stable across episodes.
