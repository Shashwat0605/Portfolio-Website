import { useEffect, useRef, useState } from 'react'

const introductionAudio = '/assets/shashwat-intro.m4a'
const introductionTranscript = `hello. My name is Shashwat. And I have always been someone who wants to know why. Why something happens? What is this thing doing? How it is solving a problem? When I come across a problem, I like to understand what's actually happening before jumping into a solution. My journey has been a mix of technology, design and art.

I have studied computer science and engineering, which has taught me to think about how things work, while painting and digital art and photography taught me to care about how things feel and look. Design became the place where these interests started coming together.

And photography. Specially wildlife and nature. Has probably influenced me the most. You can't tell a bird to wait for a perfect shot. I have to slow down, observe and know when to take the shot. I think I carry the same patients in design.

I enjoy exploring ideas, questioning my first thought, trying things out, and slowly getting closer to something that feels simple and right. I am still learning and thinking.

That's the fun part of Who am I?`
const transcriptTokens = introductionTranscript.match(/\S+\s*/g) ?? []

export default function PersonalGuide() {
  const [open, setOpen] = useState(false)
  const [audioPrepared, setAudioPrepared] = useState(false)
  const [introPlaying, setIntroPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [transcriptProgress, setTranscriptProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const followTranscriptRef = useRef(true)
  const panelRef = useRef<HTMLElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)

  const visibleTranscript = transcriptTokens
    .slice(0, Math.ceil(transcriptProgress * transcriptTokens.length))
    .join('')

  useEffect(() => {
    const transcript = transcriptRef.current
    if (!transcript || !followTranscriptRef.current) return
    transcript.scrollTop = transcript.scrollHeight
  }, [visibleTranscript])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && !panelRef.current?.contains(target) && !tabRef.current?.contains(target)) closePanel()
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [open])

  useEffect(() => () => audioRef.current?.pause(), [])

  useEffect(() => {
    if (audioPrepared) audioRef.current?.load()
  }, [audioPrepared])

  const closePanel = () => {
    const audio = audioRef.current
    audio?.pause()
    if (audio) audio.currentTime = 0
    setIntroPlaying(false)
    setShowTranscript(false)
    setTranscriptProgress(0)
    setOpen(false)
  }

  const openPanel = () => {
    followTranscriptRef.current = true
    setTranscriptProgress(0)
    setShowTranscript(false)
    setAudioPrepared(true)
    setOpen(true)
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      void audio.play().catch(() => { setIntroPlaying(false) })
    }
  }

  const prepareAudio = () => setAudioPrepared(true)

  const togglePanel = () => {
    if (open) closePanel()
    else openPanel()
  }

  const toggleIntroductionAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      setTranscriptProgress(0)
      followTranscriptRef.current = true
      setShowTranscript(true)
      void audio.play().catch(() => { setIntroPlaying(false); setShowTranscript(false) })
    } else {
      audio.pause()
      audio.currentTime = 0
      setTranscriptProgress(0)
      setShowTranscript(false)
    }
  }

  return (
    <>
      <button ref={tabRef} className={`guide-tab${open ? ' guide-tab-open' : ''}`} type="button" onClick={togglePanel} onPointerEnter={prepareAudio} onPointerDown={prepareAudio} onFocus={prepareAudio} aria-haspopup="dialog" aria-expanded={open}>
        <span id="guide-title">Listen about me</span>
        {open && <span className="guide-back-label">← Back</span>}
      </button>

      <audio
        ref={audioRef}
        className="guide-audio"
        preload={audioPrepared ? 'auto' : 'none'}
        src={introductionAudio}
        onPlay={() => { setIntroPlaying(true); setShowTranscript(true) }}
        onPause={() => setIntroPlaying(false)}
        onTimeUpdate={event => {
          const audio = event.currentTarget
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setTranscriptProgress(Math.min(1, audio.currentTime / audio.duration))
          }
        }}
        onEnded={() => { setIntroPlaying(false); setTranscriptProgress(1) }}
      >Your browser does not support audio playback.</audio>

      {open && (
        <div className="guide-backdrop">
          <section ref={panelRef} className="guide-panel" role="dialog" aria-modal="false" aria-labelledby="guide-title">
            <div className="guide-character"><img src="/assets/shashwat-guide.webp" alt="Illustration of Shashwat" /></div>
            <div className="guide-card">
              <div className="guide-intro-content">
                <button className="guide-audio-toggle" type="button" onClick={toggleIntroductionAudio}>
                  {introPlaying ? 'Stop' : 'Start'}
                </button>
                {showTranscript && (
                  <div
                    className="guide-transcript"
                    ref={transcriptRef}
                    onScroll={event => {
                      const element = event.currentTarget
                      followTranscriptRef.current = element.scrollHeight - element.scrollTop - element.clientHeight < 24
                    }}
                    aria-live="polite"
                  >
                    <h3>Transcript</h3>
                    <p>{visibleTranscript}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
