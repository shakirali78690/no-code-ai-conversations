import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Send, Copy, RefreshCw, Star, Search, Folder, Trash2, Settings, Pencil, Save, Share2, ThumbsUp, ThumbsDown, Heart, Lightbulb, Bell, Menu, ChevronDown, Paperclip, Mic, MoreVertical, User, Shield, LogOut, FileText, Database, HelpCircle } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

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

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const activeTitle = useMemo(() => chats.find((c) => c.id === activeChat)?.title || "Conversation", [chats, activeChat]);
  const [titleInput, setTitleInput] = useState(activeTitle);

  useEffect(() => {
    // hydrate sidebar state from localStorage (default: true on md+, false on mobile inherently)
    const stored = localStorage.getItem("sidebarOpen");
    if (stored !== null) setSidebarOpen(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    setTitleInput(activeTitle);
  }, [activeTitle]);

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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            <Menu className="size-4" />
          </Button>
          <span className="text-muted-foreground">/</span>
          {isEditingTitle ? (
            <input
              className="bg-transparent border-b border-border focus:outline-none text-sm"
              value={titleInput}
              autoFocus
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditingTitle(false);
                  setChats((prev) => prev.map((c) => c.id === activeChat ? { ...c, title: titleInput || activeTitle } : c));
                }
                if (e.key === 'Escape') {
                  setIsEditingTitle(false);
                  setTitleInput(activeTitle);
                }
              }}
              onBlur={() => {
                setIsEditingTitle(false);
                setChats((prev) => prev.map((c) => c.id === activeChat ? { ...c, title: titleInput || activeTitle } : c));
              }}
            />
          ) : (
            <button
              className="font-medium text-sm hover:underline"
              onClick={() => setIsEditingTitle(true)}
              title="Click to rename"
            >
              {activeTitle}
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open settings" onClick={() => setSettingsOpen(true)}>
            <Settings className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 inline-flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 size-4" /> My Profile</DropdownMenuItem>
              <DropdownMenuItem><Database className="mr-2 size-4" /> Usage & Billing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}><Settings className="mr-2 size-4" /> Settings</DropdownMenuItem>
              <DropdownMenuItem><Shield className="mr-2 size-4" /> Privacy & Data</DropdownMenuItem>
              <DropdownMenuItem><HelpCircle className="mr-2 size-4" /> Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="mr-2 size-4" /> Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your preferences</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
              <TabsTrigger value="chat">Chat Behavior</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="theme-mode">Theme mode</Label>
                <Select>
                  <SelectTrigger id="theme-mode" className="w-full">
                    <SelectValue placeholder="System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="default-model">Default model</Label>
                  <Select>
                    <SelectTrigger id="default-model">
                      <SelectValue placeholder="GPT-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="response-length">Response length</Label>
                  <Select>
                    <SelectTrigger id="response-length">
                      <SelectValue placeholder="Medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Auto-save conversations</div>
                    <div className="text-xs text-muted-foreground">Save chats automatically</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Sound notifications</div>
                    <div className="text-xs text-muted-foreground">Audio cue on reply</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4 pt-4">
              <div className="grid gap-3">
                <Button variant="secondary"><FileText className="mr-2 size-4" /> Download my data</Button>
                <Button variant="outline"><Trash2 className="mr-2 size-4" /> Delete conversation history</Button>
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Opt-out of AI training</div>
                    <div className="text-xs text-muted-foreground">Exclude my data from training</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Analytics</div>
                    <div className="text-xs text-muted-foreground">Allow usage analytics</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="personality">AI personality</Label>
                  <Select>
                    <SelectTrigger id="personality">
                      <SelectValue placeholder="Professional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="enter-behavior">Enter key behavior</Label>
                  <Select>
                    <SelectTrigger id="enter-behavior">
                      <SelectValue placeholder="Send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="send">Send</SelectItem>
                      <SelectItem value="newline">New line</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Show timestamps</div>
                    <div className="text-xs text-muted-foreground">Display message time</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Autocomplete</div>
                    <div className="text-xs text-muted-foreground">Suggest prompts</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setSettingsOpen(false)}>Close</Button>
            <Button onClick={() => { toast({ description: 'Settings saved' }); setSettingsOpen(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className={`grid grid-cols-1 ${sidebarOpen ? 'md:grid-cols-[280px,1fr]' : 'md:grid-cols-1'} overflow-hidden`}>
        <aside className={`hidden ${sidebarOpen ? 'md:flex' : 'md:hidden'} flex-col border-r border-border/60 h-[calc(100vh-56px)]`}>
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

          {/* Profile section */}
          <div className="border-t border-border/60 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src="" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">john@email.com</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => setSettingsOpen(true)}>
                  <Settings className="size-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Profile menu">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-56">
                    <DropdownMenuItem><User className="mr-2 size-4" /> My Profile</DropdownMenuItem>
                    <DropdownMenuItem><Database className="mr-2 size-4" /> Usage & Billing</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}><Settings className="mr-2 size-4" /> Settings</DropdownMenuItem>
                    <DropdownMenuItem><Shield className="mr-2 size-4" /> Privacy & Data</DropdownMenuItem>
                    <DropdownMenuItem><HelpCircle className="mr-2 size-4" /> Help & Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><LogOut className="mr-2 size-4" /> Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Plan: Plus</span>
                <span>1,247 msgs left</span>
              </div>
              <Progress value={68} />
            </div>
          </div>
        </aside>

        <section className="relative h-[calc(100vh-56px)]">
          {/* Top-left in chat area could also host a secondary toggle if desired */}
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
              <div className="rounded-xl border border-border bg-card p-2 shadow-elegant">
                <div className="flex items-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="h-10 px-3">
                        <span className="text-sm">{model}</span>
                        <ChevronDown className="ml-2 size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-64">
                      <DropdownMenuLabel>Choose a model</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setModel('GPT-3.5 Turbo')}>GPT-3.5 Turbo <span className="ml-auto text-xs text-muted-foreground">Faster, cheaper</span></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModel('GPT-4')}>GPT-4 <span className="ml-auto text-xs text-muted-foreground">Most capable</span></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModel('Claude 3')}>Claude 3 <span className="ml-auto text-xs text-muted-foreground">Alternative AI</span></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModel('Gemini Pro')}>Gemini Pro <span className="ml-auto text-xs text-muted-foreground">Google AI</span></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toast({ description: 'Model comparison coming soon' })}><FileText className="mr-2 size-4" /> Model comparison</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
                    className="flex-1 resize-none min-h-[40px] max-h-36"
                  />

                  <Button variant="ghost" size="icon" aria-label="Attach file" onClick={() => toast({ description: 'File uploads coming soon' })}>
                    <Paperclip className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Voice input" onClick={() => toast({ description: 'Voice input coming soon' })}>
                    <Mic className="size-4" />
                  </Button>
                  <Button onClick={sendMessage} disabled={!input.trim()}>
                    <Send className="mr-2" /> Send
                  </Button>
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
