import React, { useState, useRef } from 'react';
import './QuizSetup.css';

interface QuizSetupProps {
  onStartQuiz: (topic: string) => void;
  onFileUpload?: (files: File[]) => void;
  isLoading: boolean;
}

type InputMode = 'text' | 'file';

export function QuizSetup({ onStartQuiz, onFileUpload, isLoading }: QuizSetupProps) {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [topic, setTopic] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === 'text' && topic.trim()) {
      onStartQuiz(topic);
      setTopic('');
    } else if (inputMode === 'file' && selectedFiles.length > 0 && onFileUpload) {
      onFileUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="setup-container">
      <div className="setup-card animate-slide-up">
        <div className="setup-header">
          <div className="setup-icon-wrapper">
            {/*ICON*/}
          </div>
          <h1 className="setup-title">
            What do you want to learn?
          </h1>
          <p className="setup-subtitle">
            Enter a topic or upload documents to generate a custom quiz.
          </p>
        </div>

        <div className="setup-tabs">
          <button 
            className={`tab-button ${inputMode === 'text' ? 'active' : ''}`}
            onClick={() => setInputMode('text')}
          >
            Topic
          </button>
          <button 
            className={`tab-button ${inputMode === 'file' ? 'active' : ''}`}
            onClick={() => setInputMode('file')}
          >
            Upload Documents
          </button>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {inputMode === 'text' ? (
            <div style={{ position: 'relative' }} key="text-mode">
              <input
                key="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., React Hooks, Ancient Rome..."
                className="setup-input"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className="setup-button"
              >
                {isLoading ? (
                  <div className="animate-spin">
                    {/*ICON*/}
                  </div>
                ) : (
                  <>
                    Generate {/*ICON*/}
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="animate-fade-in" key="file-mode">
              <input
                key="file-input"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".txt,.pdf,.doc,.docx"
                multiple
              />

              {/* 1. File List (Scroll View) */}
              {selectedFiles.length > 0 && (
                <div className="file-list-scroll">
                  {selectedFiles.map((file, index) => (
                    <div className="file-preview" key={`${file.name}-${index}`}>
                      <div style={{ color: 'var(--primary-color)' }}>
                        {/*ICON*/}
                      </div>
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{formatFileSize(file.size)}</div>
                      </div>
                      <button type="button" onClick={() => removeFile(index)} className="remove-file-btn">
                        {/*ICON*/}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 2. Upload Box */}
              <div 
                className={`upload-area ${isDragging ? 'dragging' : ''} ${selectedFiles.length > 0 ? 'compact' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/*ICON*/}
                <div>
                  <p className="upload-text-main">
                    {selectedFiles.length > 0 ? 'Add more files' : 'Click to upload or drag and drop'}
                  </p>
                  {selectedFiles.length === 0 && (
                    <p className="upload-text-sub">PDF, DOCX, TXT up to 10MB</p>
                  )}
                </div>
              </div>

              {/* 3. Generate Button */}
              <button
                type="submit"
                disabled={selectedFiles.length === 0 || isLoading}
                className="setup-button full-width"
              >
                {isLoading ? (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/*ICON*/} Processing...
                  </div>
                ) : (
                  <>
                    Generate from {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''} {/*ICON*/}
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        {inputMode === 'text' && (
          <div className="setup-suggestions animate-fade-in">
            {['JavaScript Basics', 'World History', 'Movie Trivia', 'Science Facts'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                className="suggestion-btn"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizSetup