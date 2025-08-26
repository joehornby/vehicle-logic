# Vehicle Logic Canvas

A recreation of an early front end prototype for a vehicle logic configuration tool.

## Node Types

- Vehicle Signal Inputs
- Threshold Block
- Gate Block (logical operations)
- Calculation Block (mathematical operations)

## Getting Started

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Start the development server:**
   ```bash
   bun run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Adding Nodes**: 
   - Browse the vehicle signals library on the left
   - Drag and drop logic blocks onto the canvas
   - Or click logic blocks to add them at random positions

2. **Connecting Nodes**:
   - Click and drag from output pins to input pins
   - Visual feedback shows valid connection targets

3. **Editing Properties**:
   - Click on any node to open the property editor
   - Modify thresholds, operators, and other settings
   - Changes apply immediately

4. **Managing Canvas**:
   - Use mouse wheel to zoom
   - Click and drag to pan
   - Use the controls panel for additional options

## Technology Stack

- **Frontend**: Next.js 15.5 with React 19
- **UI Framework**: Tailwind CSS 4.0
- **Node Editor**: React Flow 11.11
- **Language**: TypeScript 5.0
- **Package Manager**: Bun

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── SignalNode.tsx
│   │   │   ├── ThresholdBlockNode.tsx
│   │   │   ├── GateBlockNode.tsx
│   │   │   └── CalculationBlockNode.tsx
│   │   ├── VehicleLogicCanvas.tsx
│   │   ├── VehicleSignalsLibrary.tsx
│   │   └── BlockEditor.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── ...
```

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/vehicle-logic)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.