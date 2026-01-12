// src/components/modules/homepage/GlitchMarquee.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TerminalEntry { type: 'command' | 'output'; text: string; }

const TerminalFooter = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // UPDATED BRAND COMMANDS
  const commands = [
    { command: "> init system --brand=wants_and_needs", output: "system loaded. aesthetic: pure.", delay: 2000 },
    { command: "> query --philosophy", output: "desire vs utility.", delay: 3000 },
    { command: "> check --inventory", output: "limited quantities. high demand.", delay: 3200 },
    { command: "> run --luxury_protocol", output: "take action.", delay: 3000 },
  ];

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const typeCommand = async (text: string, isCommand = true) => {
      setIsTyping(true);
      setDisplayText('');
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, isCommand ? 40 : 25));
      }
      setIsTyping(false);
      return new Promise(resolve => setTimeout(resolve, 800));
    };

    const runCommand = async () => {
      const cmd = commands[currentLine];
      await typeCommand(cmd.command, true);
      setTerminalHistory(prev => [...prev, { type: 'command', text: cmd.command }]);
      await new Promise(resolve => setTimeout(resolve, 200));
      await typeCommand(cmd.output, false);
      setTerminalHistory(prev => [...prev, { type: 'output', text: cmd.output }]);
      await new Promise(resolve => setTimeout(resolve, cmd.delay));
      setCurrentLine(prev => (prev + 1) % commands.length);
    };

    const interval = setTimeout(runCommand, 1000);
    return () => clearTimeout(interval);
  }, [currentLine, commands]);

  useEffect(() => {
    const cursorInterval = setInterval(() => { setShowCursor(prev => !prev); }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <footer 
      className="bg-white text-black font-mono text-xs relative border-t border-gray-100 cursor-pointer overflow-hidden py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        <div className="space-y-1 min-h-[100px] overflow-hidden">
          {terminalHistory.slice(-4).map((entry, index) => (
            <div key={index} className={`transition-all duration-300 ${ entry.type === 'command' ? 'text-black font-bold' : 'text-gray-500 ml-2' }`}>
              {entry.text}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-black font-bold">{displayText}</span>
            <span className={`ml-1 text-black ${showCursor && !isTyping ? 'opacity-100' : 'opacity-0'}`}>_</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TerminalFooter;