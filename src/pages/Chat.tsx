import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Send, Copy, RefreshCw, Star, Search, Folder, Trash2, Palette, Sun, Moon, Settings, Pencil, Save, Share2, ThumbsUp, ThumbsDown, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const initialChats = [
  { id: "c1", title: "Marketing plan ideas" },
  { id: "c2", title: "Refactor React hooks" },
  { id: "c3", title: "Trip itinerary in Japan" },
];

const models = ["GPT-4", "Claude 3.5", "Gemini 1.5"]; 

const Chat = () => {
  const [activeChat, setActiveChat] = useState(initialChats[0].id);
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "assistant", content: "Hi! I’m NovaChat. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(models[0]);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [filter, setFilter] = useState<'all' | 'today' | 'yesterday' | 'week' | 'archived'>('all');

  const filteredChats = useMemo(() => {
    return chats.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  }, [chats, search]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    // Fake assistant reply
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `You said: "${userMsg.content}"\n\n(Model: ${model})`,
      };
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }, 700);
  };

  const copyMessage = async (m: Message) => {
    await navigator.clipboard.writeText(m.content);
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <Helmet>
        <title>Chat | NovaChat AI</title>
        <meta name="description" content="Clean, fast AI chat with model switching, history, and more." />
        <link rel="canonical" href={`${window.location.origin}/chat`} />
      </Helmet>
      <header className="border-b border-border/60 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold">NovaChat</Link>
          <span className="text-muted-foreground">/</span>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-secondary text-foreground border border-border rounded-md px-2 py-1 text-sm">
            {models.map(m => (<option key={m}>{m}</option>))}
          </select>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="text-xs text-muted-foreground hidden sm:block">Usage: — tokens</div>
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open settings"><Settings className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>🎨 Themes</DropdownMenuItem>
              <DropdownMenuItem>🔧 Preferences</DropdownMenuItem>
              <DropdownMenuItem>📊 Usage Analytics</DropdownMenuItem>
              <DropdownMenuItem>📤 Export Chat History</DropdownMenuItem>
              <DropdownMenuItem>⚙️ Account Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] overflow-hidden">
        <aside className="hidden md:flex flex-col border-r border-border/60 h-[calc(100vh-56px)]">
          <div className="p-3 flex gap-2">
            <Button variant="hero" className="w-full" onClick={() => {
              const id = crypto.randomUUID();
              setChats([{ id, title: "New Chat" }, ...chats]);
              setActiveChat(id);
              setMessages([{ id: crypto.randomUUID(), role: 'assistant', content: 'New chat started. Ask me anything!' }]);
            }}>
              <Plus className="mr-2" /> New chat
            </Button>
          </div>
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Search className="size-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={filter === 'today' ? 'secondary' : 'ghost'} onClick={() => setFilter('today')}>Today</Button>
              <Button size="sm" variant={filter === 'yesterday' ? 'secondary' : 'ghost'} onClick={() => setFilter('yesterday')}>Yesterday</Button>
              <Button size="sm" variant={filter === 'week' ? 'secondary' : 'ghost'} onClick={() => setFilter('week')}>Last Week</Button>
              <Button size="sm" variant={filter === 'archived' ? 'secondary' : 'ghost'} onClick={() => setFilter('archived')}>Archived</Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-2 pb-4 space-y-2">
            {filteredChats.map(c => (
              <Card key={c.id} className={`p-3 cursor-pointer ${activeChat === c.id ? 'border-primary' : ''}`} onClick={() => setActiveChat(c.id)}>
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm">{c.title}</div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="size-4" />
                    <Folder className="size-4" />
                    <Trash2 className="size-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </aside>

        <section className="relative h-[calc(100vh-56px)]">
          <div ref={containerRef} className="absolute inset-0 overflow-auto px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`group rounded-lg px-4 py-3 max-w-[85%] shadow-sm border ${m.role === 'user' ? 'bg-primary text-primary-foreground border-transparent' : 'bg-card border-border'}`}>
                    <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="hover:underline" onClick={() => copyMessage(m)}><Copy className="inline size-3 mr-1" /> Copy</button>
                      <button className="hover:underline" onClick={() => toast({ description: 'Regenerating response...' })}><RefreshCw className="inline size-3 mr-1" /> Regenerate</button>
                      <button className="hover:underline" onClick={() => toast({ description: 'Edit mode coming soon' })}><Pencil className="inline size-3 mr-1" /> Edit</button>
                      <button className="hover:underline" onClick={() => toast({ description: 'Saved to templates' })}><Save className="inline size-3 mr-1" /> Save</button>
                      <button className="hover:underline" onClick={() => toast({ description: 'Share link copied' })}><Share2 className="inline size-3 mr-1" /> Share</button>
                      <span className="ml-auto inline-flex items-center gap-1">
                        <button title="Like" onClick={() => toast({ description: 'Thanks for the feedback!' })}><ThumbsUp className="size-3" /></button>
                        <button title="Dislike" onClick={() => toast({ description: 'We\'ll improve it!' })}><ThumbsDown className="size-3" /></button>
                        <button title="Love" onClick={() => toast({ description: 'Saved to favorites' })}><Heart className="size-3" /></button>
                        <button title="Idea" onClick={() => toast({ description: 'Noted!' })}><Lightbulb className="size-3" /></button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-3 max-w-[85%] shadow-sm border bg-card border-border">
                    <span className="inline-flex gap-1 items-center">
                      <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse"></span>
                      <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]"></span>
                      <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl border border-border bg-card p-3 shadow-elegant">
                <Textarea
                  placeholder="Type a message (Shift + Enter for newline)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="min-h-[60px] max-h-48"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">Model: {model}</div>
                  <Button onClick={sendMessage}><Send className="mr-2" /> Send</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chat;
