import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell, LogIn, MessageCircle, Star, StarOff, X } from "lucide-react";
import { menuItems } from "../../constants/menuItems";
import { MenuItem } from "../../types";

interface HeaderProps {
  isLoggedIn: boolean;
  activeMenu: string;
  favorites: string[];
  onLoginClick: () => void;
  onLogout: () => void;
  onFavoriteToggle: (menuKey: string) => void;
  onFavoriteRemove: (menuKey: string) => void;
  onMenuSelect: (menuKey: string) => void;
  onChatToggle: () => void;
}

export function Header({
  isLoggedIn,
  activeMenu,
  favorites,
  onLoginClick,
  onLogout,
  onFavoriteToggle,
  onFavoriteRemove,
  onMenuSelect,
  onChatToggle,
}: HeaderProps) {
  const favoriteItems = favorites
    .map(key => menuItems.find(item => item.key === key))
    .filter(Boolean) as MenuItem[];

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      {/* Left Section - User Profile */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <SidebarTrigger />
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" alt="사용자" />
              <AvatarFallback>관리자</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium">관리자</span>
          </div>
        ) : (
          <Button size="sm" onClick={onLoginClick}>
            <LogIn className="h-4 w-4 mr-2" />
            로그인
          </Button>
        )}
      </div>

      {/* Center Section - Favorites */}
      <div className="flex items-center gap-2 max-w-md mx-4 overflow-hidden">
        {favoriteItems.length > 0 && (
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <div className="flex gap-1 max-w-sm overflow-x-auto scrollbar-hide">
              {favoriteItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer transition-colors ${
                    activeMenu === item.key 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background hover:bg-accent'
                  }`}
                  onClick={() => onMenuSelect(item.key)}
                >
                  <item.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-3 w-3 p-0 hover:bg-destructive/20 ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteRemove(item.key);
                    }}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
        {/* Favorite Toggle Button */}
        {isLoggedIn && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFavoriteToggle(activeMenu)}
            title={favorites.includes(activeMenu) ? "즐겨찾기 제거" : "즐겨찾기 추가"}
          >
            {favorites.includes(activeMenu) ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        )}
        
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onChatToggle}
          className="md:hidden"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        
        {isLoggedIn && (
          <Button variant="ghost" size="sm" onClick={onLogout}>
            로그아웃
          </Button>
        )}
      </div>
    </header>
  );
}