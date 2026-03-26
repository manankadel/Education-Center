"use client";
import React, { useState, useEffect } from 'react';

interface TerminalEntry { type: 'command' | 'output'; text: string; }

const TerminalFooter = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  
  const commands = [
    { command: "> sys.check --inputs", output: "All channels active. Signal clear.", delay: 2000 },
    { command: "> load --catalog", output: "Fetching inventory: Guitars, Keys, Drums...", delay: 3000 },
    { command: "> run --sound_check", output: "Levels optimal. Ready to record.", delay: 3200 },
    { command: "> ping --musicians_planet", output: "Connection established. 10ms latency.", delay: 3000 },
  ];

  useEffect(() => {
    const typeCommand = async (text: string) => {
      setIsTyping(true);
      setDisplayText('');
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      setIsTyping(false);
      return new Promise(resolve => setTimeout(resolve, 800));
    };

    const runCommand = async () => {
      const cmd = commands[currentLine];
      await typeCommand(cmd.command);
      setTerminalHistory(prev => [...prev, { type: 'command', text: cmd.command }]);
      await new Promise(resolve => setTimeout(resolve, 200));
      await typeCommand(cmd.output);
      setTerminalHistory(prev => [...prev, { type: 'output', text: cmd.output }]);
      await new Promise(resolve => setTimeout(resolve, cmd.delay));
      setCurrentLine(prev => (prev + 1) % commands.length);
    };

    const interval = setTimeout(runCommand, 1000);
    return () => clearTimeout(interval);
  }, [currentLine]);

  useEffect(() => {
    const cursorInterval = setInterval(() => { setShowCursor(prev => !prev); }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <footer className="bg-[#050505] text-green-500 font-mono text-xs relative border-t border-white/10 cursor-default overflow-hidden py-6">
      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-4 opacity-50 text-[10px] uppercase">
             <span>System: TMP_OS_v2.0</span>
             <span>Status: Online</span>
        </div>
        <div className="space-y-1 min-h-[120px] overflow-hidden font-mono">
          {terminalHistory.slice(-4).map((entry, index) => (
            <div key={index} className={`${entry.type === 'command' ? 'text-tmp-amber' : 'text-gray-400 ml-4'}`}>
              {entry.text}
            </div>
          ))}
          <div className="flex items-center text-tmp-amber">
            <span>{displayText}</span>
            <span className={`ml-1 ${showCursor && !isTyping ? 'opacity-100' : 'opacity-0'}`}>_</span>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-white/20 text-[10px]">
            © 2026 THE MUSICIANS PLANET. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default TerminalFooter;