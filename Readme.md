Proxima View 🚀

A modern, cross-platform 3D Model Viewer

Proxima View is designed to offer a clean, intuitive, and feature-rich environment for inspecting, debugging, and exporting GLTF and GLB assets. It is built using Electron to ensure native desktop performance and compatibility across Windows, macOS, and Linux.

![App Screenshot](https://github.com/akarca/ProximaView/blob/main/app.webp)

✨ Key Features

Proxima View v1.0.0 provides a strong foundation for 3D asset inspection.

📦 Core Viewing & Interaction

GLTF/GLB Support: Seamlessly load and view industry-standard 3D models (.glb and .gltf formats).

Intuitive Controls: Effortlessly manipulate the camera with built-in controls (pan, zoom, orbit).

Drag-and-Drop Support: Quickly load files directly by dragging them into the viewer window.

🎬 Animation Tools

Animation Playback: Automatically detects and plays animations embedded in the 3D model.

Animation Selector: Easily switch between all available animations within the model.

Play/Pause Control: Full control over animation playback.

🖼️ PNG Sequence Export of 3D Animations

Animation Sequence Export: Export the currently selected animation as a high-quality PNG sequence (24 frames per second) compressed into a single ZIP archive. This feature is ideal for creating flipbook animations and spritesheets for 2D game engines and post-production workflows.

🎨 Advanced Rendering

Tone Mapping Selector: Adjust the final look and dynamic range of your model with professional tone mapping algorithms: ACES, Reinhard, Cineon, Linear, and None.

💻 Getting Started

Download latest release from [https://github.com/akarca/ProximaView/releases](https://github.com/akarca/ProximaView/releases)

Or build from source using the following commands:

```
git clone https://github.com/akarca/ProximaView.git
cd ProximaView
npm install
npm run package
```
