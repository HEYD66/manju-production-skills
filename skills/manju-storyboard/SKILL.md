---
name: manju-storyboard
description: Convert Chinese AI comic-drama/manju scripts into production-ready storyboard prompts for AI video generation. Use when the user asks for 漫剧分镜, 剧本转分镜, 分镜提示词, Seedance/AI视频分镜, episode timing, 15秒区块拆分, shot planning, hook design, camera movement, or checking storyboard continuity, dialogue retention, shot duration, axis, reaction shots, and character staging.
---

# Manju Storyboard

## Workflow

Convert the script into short-video storyboard units that AI video tools can reliably generate.

Before starting production, ask for missing project information. Do not generate the storyboard immediately unless the user has already provided enough answers.

Ask concise questions covering:

- Target platform and screen format: Douyin/Kuaishou/Xiaohongshu/Bilibili, vertical or horizontal.
- Episode plan: target duration per episode, number of episodes to process now, whether output should be one episode or batch.
- Script type: complete script, summary script, novel excerpt, or outline.
- Style: realistic live-action, anime, Chinese comic, Korean comic, ancient fantasy, modern drama, etc.
- AI video tool: Seedance, Jimeng, RunningHub, Kling, or other; include model/version if known.
- Output depth: rough storyboard, production storyboard, or final carding-ready storyboard.
- Dialogue policy: preserve exactly, allow expansion, or allow compression.
- Existing assets: whether character IDs, scene IDs, prop IDs, and reference images already exist.

After the user answers, continue:

1. Read the whole script first, including previous/next episode context if provided.
2. Identify the visual tone, main conflict, emotional rhythm, locations, characters, and must-keep dialogue.
3. Decide whether the source is a complete script or a summary script:
   - Complete script: preserve all original dialogue exactly. Do not delete, rewrite, or omit.
   - Summary script: expand only where needed for pacing, logic, and short-drama emotional beats; keep the original plot direction.
4. Split each episode into 15-second blocks. Every block uses a relative timeline of `0-15s`; never write cumulative times like `15-30s`.
5. In every block, reset the environment, light, character positions, and interaction state before listing shots.
6. Design each shot with shot size, angle, camera movement, visible action, facial expression, body state, dialogue or sound effect.
7. End each episode with a hook: a reveal, threat, unresolved choice, shocking line, or emotionally charged visual.

## Block Rules

Every block must begin with:

```text
第N区块 (0-15秒)
【本块场景与站位重构】:
[场景名称；环境、光线；使用 @ID 激活本块人物/场景参考；明确所有人物的绝对/相对站位、朝向、距离、姿态、交互状态。]
```

Use `@ID` only once per 15-second block, inside the staging reset. In shot descriptions, use character names instead of `@ID`.

Avoid switching locations inside one block. If unavoidable, mark the scene name before the affected shot.

When A looks at or reacts to B, describe B's visible appearance, position, expression, and action so the target does not disappear.

## Timing

Use these timing heuristics:

- Dialogue shot: approximately `(Chinese character count / 4) + 1.5s` buffer.
- Micro action: `1-2s`.
- Normal action: `2-3s`.
- Complex action or environmental action: `4-5s`.
- A single speaker shot should usually not exceed `4s`; split long lines with close-up, over-the-shoulder, reverse shot, reaction shot, hands/prop detail, or crowd reaction.

Every block must end exactly at `15s`.

## Shot Design

Vary shot language. Do not rely on slow push-in throughout.

Use combinations such as:

- Establishing medium-wide or wide shot for new location and positions.
- Medium shot for dialogue.
- Close-up and extreme close-up for emotion, eyes, lips, hands, important props.
- Over-the-shoulder and shot/reverse-shot for confrontation.
- Low angle for authority, high angle for pressure or weakness, Dutch angle for instability.
- Pan, tilt, tracking, orbit, crane, dolly in/out, handheld, whip pan, match cut, blocking transition.

Maintain screen direction and axis. Do not jump character left/right positions without an explicit movement.

For emotional text, write visible physical behavior instead of abstractions. Replace "他很伤心" with concrete details such as red eyes, tightened mouth, trembling shoulders, tear track, lowered gaze.

## Output Format

Use this structure unless the user requests another format:

```text
第N集

第1区块 (0-15秒)
【本块场景与站位重构】:
...
0-3s 画面: [景别；角度；运镜；人物动作、表情、站位连续性；台词/音效]
3-7s 画面: ...
7-15s 画面: ...
```

When the user wants an Excel/table production format, put the video-model-ready prompt first. The first column must be a complete prompt that can be copied directly into Seedance/Jimeng/RunningHub. If a 15-second block contains multiple sub-shots such as `1-1`, `1-2`, `1-3`, and `1-4`, combine the whole block into one first-column cell, preferably merged vertically across those sub-shot rows. Subsequent columns are for human review and production tracking.

Recommended columns:

```text
总提示词（可直接复制给视频模型）
分镜序号
对应序号的提示词
本块台词
景别
拍摄角度
运镜方式
画面内容/动作
出场人物
场景/站位
音效
时长
备注/检查
```

The total prompt should include project style, model, screen format, negative constraints, block/shot number, total duration, scene/staging, all characters, all sub-shot timing, shot sizes, angles, camera movements, actions, dialogue, sounds, and concise sub-shot prompts.

For dialogue, write:

```text
[台词] “原台词” （语气；面部微表情；肢体状态）
```

For no-dialogue shots, write useful sound:

```text
[音效] 翻书声 / 电流声 / 雨声 / 脚步声 / 衣料摩擦声
```

## QA Checklist

Before delivering, check:

- Original episode content maps to the correct episode.
- Original dialogue is preserved unless the source is summary-only and expansion was requested.
- Each block uses `0-15s` relative timing and ends at `15s`.
- Each block has a staging reset and only one `@ID` activation zone.
- Character positions, posture, handedness, props, distance, and gaze remain continuous.
- Long dialogue is split with reaction shots or shot-size changes.
- Camera angles and shot sizes are varied but not chaotic.
- No vague, non-visual descriptions.
- No axis jump, unexplained teleporting, or disappearing interaction partner.
- The episode ends with a strong short-drama hook.
