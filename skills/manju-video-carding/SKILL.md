---
name: manju-video-carding
description: Convert AI comic-drama/manju storyboards and art assets into AI video generation carding prompts. Use when the user asks for 抽卡, 视频生成提示词, Seedance/即梦/RunningHub card prompts, 首尾帧, 参考图标注, 角色站位, AI视频一致性, pure video output, no字幕/no水印/noBGM, or checking generated-shot prompt quality.
---

# Manju Video Carding

## Goal

Turn storyboard blocks and asset references into concise, consistent video-generation prompts that preserve character identity, scene layout, dialogue, camera movement, and clean output.

## Project Intake

Before writing carding prompts, ask for missing project information. Do not start prompt production immediately unless the user already provided enough answers.

Ask concise questions covering:

- Target video tool/model: Seedance, Jimeng, RunningHub, Kling, Hailuo, or other.
- Output format: prompt per shot, prompt per 15-second block, or batch table.
- Screen format and duration: vertical/horizontal, target seconds per clip/block.
- Reference assets available: character images, scene images, prop images, first/last frames, asset IDs.
- Style lock: realistic live-action, anime, 3D/CG, ancient romance, modern short drama, etc.
- Audio policy: dialogue included or silent, environment sound only, no BGM, subtitle handling.
- Consistency priority: face/outfit, scene layout, prop shape, action continuity, camera movement, or all.
- Failure tolerance: fast multiple drafts or strict production prompts.

Then proceed with carding prompt generation.

## Prompt Structure

Use this order:

1. Material references
2. Scene base
3. Character and staging
4. Timeline shots
5. Character state details
6. Style and negative constraints

For spreadsheet delivery, put a complete copy-ready prompt in the first column named `总提示词（可直接复制给视频模型）`. One 15-second block should have one total prompt cell: if the block is split into `1-1`, `1-2`, `1-3`, and `1-4`, merge or group the first-column cell across those rows and include the full block prompt there. Columns after it may split the same information into `分镜序号`, `对应序号的提示词`, `本块台词`, `景别`, `拍摄角度`, `运镜方式`, `画面内容/动作`, `出场人物`, `场景/站位`, `音效`, `时长`, and `备注/检查` for readability.

Template:

```text
【素材参考】
图片1：角色/场景/道具名称
图片2：...

【场景基础设定】
场景地点：
时间与光线：
环境氛围：

【角色设定】
角色A：
角色B：

【站位与关系】
角色A：
角色B：
角色关系：

【分镜时序脚本】
0-Xs：[景别/视角/运镜] + [画面内容/角色动作/表情/目光/站位变化] + [台词/音效/特效]
X-Ys：...

【角色状态细节】
角色A：
角色B：

【整体风格与技术规范】
真人写实/动漫/次世代等风格；电影级运镜；4K/8K；清晰音质；环境音效；无字幕；无水印；无BGM。
```

## Reference Naming

At the top, label every uploaded reference image with a stable name:

```text
图片1：男主_1_黑西装
图片2：女主_1_白裙
图片3：1_豪华卧室_夜内
图片4：1_玉佩
```

Later prompts should use these names consistently. Do not rename the same person, outfit, prop, or scene within the same task.

## Staging Rules

For medium, wide, or group shots, describe every visible person:

- position in frame
- distance between characters
- facing direction
- pose
- expression
- gaze direction
- hand/prop state

For close-up shots, describe the subject and the interaction target if relevant.

When two or more characters have similar height and no intended depth difference, explicitly say their height is consistent to reduce size errors.

For uncommon sizes, specify numbers: `怪兽高5米`, `两人相距10米`, `道具长30厘米`.

For start/end-frame or first/last-frame video generation, specify:

- start position and pose
- end position and pose
- what changes during the motion
- what must remain unchanged in other characters and background

## Dialogue And Audio

Preserve all dialogue exactly when source dialogue is provided.

Require clean video output:

```text
禁止出现字幕，禁止出现任何文字、水印、logo，不添加BGM，只保留环境音效和角色台词；如果生成文字，文字透明度100%。
```

Do not ask the video model to add subtitles. Subtitles belong in editing.

## Style Controls

Use only a small number of camera instructions per prompt, usually 2-3. Avoid piling up incompatible movements.

Common quality language:

```text
保持人物面貌特征、服装颜色、发型、身高比例、道具形状、场景布局在所有分镜中一致；超清4K/8K画质，电影级动态镜头，真实物理碰撞，光影层次丰富，画面纯净。
```

Useful lighting terms:

- 轮廓光: back/side-back rim light to separate subject from background.
- 发丝光: back upper light catching hair edge.
- 柔光镜: soft, misty, lower-contrast image.
- 小景深: shallow depth of field to isolate subject.

For realistic ancient/romance tone:

```text
真人实拍，高级电影感，柔和轮廓光，发丝通透柔光，自然日光漫射，衣袂微动，低饱和温润色调，细腻肤质，自然妆容，运镜丝滑。
```

## Shot-Level Checks

Before delivering prompts, verify:

- The referenced assets exist in the user's asset list or supplied images.
- Character face, outfit, hairstyle, and prop state are stable.
- Scene, lighting, and time of day match the storyboard.
- The shot includes all necessary characters and their positions.
- No subtitles, watermarks, logos, or BGM are requested.
- Dialogue is unchanged.
- Camera movement is readable and not overstacked.
- Axis and left/right positions do not flip unexpectedly.
- Background-only references are described as background, not as live action.

## Repair Prompts

For common generation issues, add a concise correction:

- Wrong face/outfit: `严格保持参考图中人物脸型、五官、发型、服装颜色和纹样不变。`
- Wrong background: `背景完全使用图片X的场景结构和光线，不改变门窗、家具、道路位置。`
- Bad text/subtitles: `画面内无任何文字、字幕、水印、logo。`
- Wrong size/distance: `两人身高一致，站在同一地面水平线上，相距2米，无近大远小误差。`
- Bad scene angle: `保持画面一致性，将镜头改为平视正面视角/俯视视角/向左旋转90度。`
