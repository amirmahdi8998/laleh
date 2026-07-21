import { useRef, useCallback, useEffect, useState } from 'react';
import { useUI } from '../context';

const BTN = ({ label, title, onClick, active }) => (
  <button type="button" className={`rte-btn${active ? ' on' : ''}`} onClick={onClick} title={title}>{label}</button>
);

export default function RichTextEditor({ value, onChange, placeholder }) {
  const { t } = useUI();
  const ref = useRef(null);
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const update = useCallback(() => {
    if (onChange) onChange(ref.current.innerHTML);
  }, [onChange]);

  const exec = (cmd, val) => {
    document.execCommand(cmd, false, val);
    ref.current?.focus();
    update();
  };

  const handleInput = useCallback(() => {
    update();
  }, [update]);

  const handleLinkOpen = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount || !sel.toString().trim()) return;
    setLinkUrl('');
    setShowLink(true);
  };

  const handleLinkApply = () => {
    if (linkUrl) {
      exec('createLink', linkUrl);
    }
    setShowLink(false);
    setLinkUrl('');
    ref.current?.focus();
  };

  const handleLinkRemove = () => {
    exec('unlink');
    setShowLink(false);
    setLinkUrl('');
    ref.current?.focus();
  };

  const handleHeading = (tag) => {
    document.execCommand('formatBlock', false, `<${tag}>`);
    ref.current?.focus();
    update();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      document.execCommand('insertParagraph');
      e.preventDefault();
    }
  };

  return (
    <div className="rte-wrap">
      <div className="rte-toolbar">
        <BTN label="H2" title={t.editor.h2} onClick={() => handleHeading('h2')} />
        <BTN label="H3" title={t.editor.h3} onClick={() => handleHeading('h3')} />
        <span className="rte-sep" />
        <BTN label={<b>ب</b>} title={t.editor.bold} onClick={() => exec('bold')} />
        <BTN label={<i>ک</i>} title={t.editor.italic} onClick={() => exec('italic')} />
        <BTN label={<u>ز</u>} title={t.editor.underline} onClick={() => exec('underline')} />
        <span className="rte-sep" />
        <BTN label="•" title={t.editor.ul} onClick={() => exec('insertUnorderedList')} />
        <BTN label="1." title={t.editor.ol} onClick={() => exec('insertOrderedList')} />
        <span className="rte-sep" />
        <BTN label="🔗" title={t.editor.link} onClick={handleLinkOpen} />
      </div>

      {showLink && (
        <div className="rte-linkbar">
          <input
            type="url"
            className="rte-link-input"
            placeholder="https://..."
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLinkApply(); }}
            autoFocus
          />
          <button type="button" className="rte-link-apply" onClick={handleLinkApply}>✓</button>
          <button type="button" className="rte-link-remove" onClick={handleLinkRemove}>✕</button>
        </div>
      )}

      <div
        ref={ref}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder || ''}
      />
    </div>
  );
}
