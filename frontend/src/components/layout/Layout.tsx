import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatPanel } from "../chat/ChatPanel";
import { ChatPopup } from "../chat/ChatPopup";
import { LoginModal } from "../auth/LoginModal";
import { ChatRoom } from "../../types";

interface LayoutProps {
  children: ReactNode;
  activeMenu: string;
  onMenuSelect: (key: string) => void;
  isLoggedIn: boolean;
  favorites: string[];
  isChatCollapsed: boolean;
  selectedChatRoom: ChatRoom | null;
  isChatPopupOpen: boolean;
  isLoginModalOpen: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  onFavoriteToggle: (menuKey: string) => void;
  onFavoriteRemove: (menuKey: string) => void;
  onChatToggle: () => void;
  onChatRoomClick: (chatRoom: ChatRoom) => void;
  onCloseChatPopup: () => void;
  onLogin: (username: string, password: string) => void;
  onCloseLoginModal: () => void;
}

export function Layout({
  children,
  activeMenu,
  onMenuSelect,
  isLoggedIn,
  favorites,
  isChatCollapsed,
  selectedChatRoom,
  isChatPopupOpen,
  isLoginModalOpen,
  onLoginClick,
  onLogout,
  onFavoriteToggle,
  onFavoriteRemove,
  onChatToggle,
  onChatRoomClick,
  onCloseChatPopup,
  onLogin,
  onCloseLoginModal,
}: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Left Sidebar */}
        <AppSidebar activeMenu={activeMenu} onMenuSelect={onMenuSelect} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header
            isLoggedIn={isLoggedIn}
            activeMenu={activeMenu}
            favorites={favorites}
            onLoginClick={onLoginClick}
            onLogout={onLogout}
            onFavoriteToggle={onFavoriteToggle}
            onFavoriteRemove={onFavoriteRemove}
            onMenuSelect={onMenuSelect}
            onChatToggle={onChatToggle}
          />

          {/* Page Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

        {/* Right Chat Panel - 데스크톱에서만 표시 */}
        <div className="hidden md:block">
          <ChatPanel 
            isCollapsed={isChatCollapsed} 
            onToggleCollapse={onChatToggle}
            onChatRoomClick={onChatRoomClick}
          />
        </div>

        {/* Mobile Chat Overlay */}
        {!isChatCollapsed && (
          <div className="md:hidden fixed inset-0 z-40 bg-background">
            <ChatPanel 
              isCollapsed={false} 
              onToggleCollapse={onChatToggle}
              onChatRoomClick={onChatRoomClick}
            />
          </div>
        )}

        {/* Chat Popup */}
        <ChatPopup
          chatRoom={selectedChatRoom}
          isOpen={isChatPopupOpen}
          onClose={onCloseChatPopup}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={onCloseLoginModal}
          onLogin={onLogin}
        />
      </div>
    </SidebarProvider>
  );
}