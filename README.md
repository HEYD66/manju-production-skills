# Manju Production Skills

AI 漫剧生产流程技能包，包含分镜、美工资产、抽卡提示词三个 Codex skill。

## Contents

- `skills/manju-storyboard`: 剧本转分镜与视频提示词表。
- `skills/manju-art-assets`: 美工资产表、人设、场景、道具提示词规范。
- `skills/manju-video-carding`: 抽卡、首尾帧、视频生成卡片提示词规范。

## Workflow

项目开始前先询问信息，再按顺序生成：

1. 分镜提示词表：每个 15 秒区块前置一个可直接复制给视频模型的总提示词。
2. 美工资产表：每个资产前置一个可直接复制给生图模型的总提示词。
3. 抽卡提示词：根据分镜和资产表生成视频模型可用提示词。

默认资产图规格为 16:9 横图。人设图使用 7 格角色设定参考图格式，并加入减少假细节、假纹理、噪点的控制词。

## Install Locally

把 `skills` 下的目录复制到本机 Codex skill 目录：

```powershell
Copy-Item -Recurse -Force .\skills\manju-* "$env:USERPROFILE\.codex\skills\"
```

重启 Codex 后即可使用这些 skill。
