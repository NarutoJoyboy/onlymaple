'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function TestFirebasePage() {
  const [status, setStatus] = useState('Idle');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1]} - ${msg}`]);

  const testConnection = async () => {
    setStatus('Testing...');
    setLogs([]);
    addLog('Starting connection test...');

    try {
      const testRef = doc(db, 'test_collection', 'connectivity_test');
      addLog('Reference created. Attempting write...');
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Write timeout (5s)')), 5000)
      );

      await Promise.race([
        setDoc(testRef, { timestamp: Date.now(), status: 'online' }),
        timeoutPromise
      ]);

      addLog('Write successful!');
      
      addLog('Attempting read...');
      const snap = await getDoc(testRef);
      if (snap.exists()) {
        addLog('Read successful! Data: ' + JSON.stringify(snap.data()));
        setStatus('Success');
      } else {
        addLog('Read failed: Document not found (latency?)');
        setStatus('Partial Success');
      }

    } catch (err: any) {
      console.error(err);
      addLog('Error: ' + err.message);
      if (err.code) addLog('Code: ' + err.code);
      setStatus('Failed');
    }
  };

  return (
    <div className="p-10 font-mono">
      <h1 className="text-2xl font-bold mb-4">Firebase Connectivity Test</h1>
      <button 
        onClick={testConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Test
      </button>
      <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300 min-h-[200px]">
        <div className="font-bold mb-2">Status: {status}</div>
        <div className="text-sm space-y-1">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>
    </div>
  );
}
