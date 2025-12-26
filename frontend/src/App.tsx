import { useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PlaceholderPage } from "./components/common/PlaceholderPage";
import { HRManagement } from "./components/hr/HRManagement";
import { HRProfile } from "./components/hr/HRProfile";
import { CompanyNotices } from "./components/notices/CompanyNotices";
import { DepartmentNotices } from "./components/notices/DepartmentNotices";
import { Schedule } from "./components/schedule/Schedule";
import { ApprovalManagement } from "./components/approval/ApprovalManagement";
import { useFavorites } from "./hooks/useFavorites";
import { useChat } from "./hooks/useChat";
import { AlertProvider } from "./components/modal/Modal";
import { Alert } from "./components/ui/alert";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 개발 편의를 위해 기본값 true

  const { favorites, toggleFavorite, removeFavorite } = useFavorites();
  const {
    isChatCollapsed,
    selectedChatRoom,
    isChatPopupOpen,
    toggleChatPanel,
    handleChatRoomClick,
    handleCloseChatPopup,
  } = useChat();

  const handleLogin = (username: string, password: string) => {
    // 모의 로그인 처리
    console.log("로그인:", username, password);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenu("dashboard");
    setIsLoginModalOpen(true);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <PlaceholderPage title="재고 관리" description="상품 재고를 효율적으로 관리하세요" />;
      case "sales":
        return <PlaceholderPage title="판매 관리" description="주문과 판매를 체계적으로 관리하세요" />;
      case "customers":
        return <PlaceholderPage title="고객 관리" description="고객 정보와 관계를 관리하세요" />;
      case "finance":
        return <PlaceholderPage title="재무 관리" description="재무 현황과 회계를 관리하세요" />;
      case "hr-management":
        return <HRManagement />;
      case "hr-profile":
        return <HRProfile />;
      case "company-notices":
        return <CompanyNotices />;
      case "department-notices":
        return <DepartmentNotices />;
      case "schedule":
        return <Schedule />;
      case "approval":
        return <ApprovalManagement />;
      case "reports":
        return <PlaceholderPage title="보고서" description="다양한 비즈니스 보고서를 확인하세요" />;
      case "settings":
        return <PlaceholderPage title="설정" description="시스템 설정을 관리하세요" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AlertProvider>
      <Layout
        activeMenu={activeMenu}
        onMenuSelect={setActiveMenu}
        isLoggedIn={isLoggedIn}
        favorites={favorites}
        isChatCollapsed={isChatCollapsed}
        selectedChatRoom={selectedChatRoom}
        isChatPopupOpen={isChatPopupOpen}
        isLoginModalOpen={isLoginModalOpen}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onFavoriteToggle={toggleFavorite}
        onFavoriteRemove={removeFavorite}
        onChatToggle={toggleChatPanel}
        onChatRoomClick={handleChatRoomClick}
        onCloseChatPopup={handleCloseChatPopup}
        onLogin={handleLogin}
        onCloseLoginModal={() => setIsLoginModalOpen(false)}
      >
        {renderContent()}
      </Layout>
    </AlertProvider>
  );
}