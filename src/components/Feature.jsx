import React, { useState, useEffect, useRef } from "react";

const FeaturesParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const containerRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Gợi ý chủ đề theo xu hướng",
      description:
        "AI phân tích xu hướng thời gian thực để đề xuất nội dung hot nhất",
      icon: "📈",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      shadowColor: "rgba(102, 126, 234, 0.25)",
    },
    {
      id: 2,
      title: "Sinh kịch bản tự động",
      description: "Tạo kịch bản video chuyên nghiệp chỉ với vài từ khóa",
      icon: "✨",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      shadowColor: "rgba(240, 147, 251, 0.25)",
    },
    {
      id: 3,
      title: "Text-to-Speech AI",
      description:
        "Chuyển đổi văn bản thành giọng nói tự nhiên với 50+ giọng đọc",
      icon: "🔊",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      shadowColor: "rgba(79, 172, 254, 0.25)",
    },
    {
      id: 4,
      title: "Tạo video tự động",
      description:
        "Sản xuất video hoàn chỉnh từ script với hiệu ứng và chuyển cảnh",
      icon: "🎬",
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      shadowColor: "rgba(67, 233, 123, 0.25)",
    },
    {
      id: 5,
      title: "Xuất bản video sắc nét",
      description:
        "Render video 4K với tối ưu hóa cho mọi nền tảng mạng xã hội",
      icon: "💎",
      color: "#fa709a",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      shadowColor: "rgba(250, 112, 154, 0.25)",
    },
    {
      id: 6,
      title: "Chỉnh sửa video",
      description: "Công cụ edit mạnh mẽ với AI hỗ trợ cắt, ghép và hiệu ứng",
      icon: "✂️",
      color: "#a8edea",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      shadowColor: "rgba(168, 237, 234, 0.25)",
    },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          // Check which cards are visible with intersection observer logic
          const newVisibleCards = new Set();
          features.forEach((feature) => {
            const element = document.getElementById(`feature-${feature.id}`);
            if (element) {
              const rect = element.getBoundingClientRect();
              const threshold = window.innerHeight * 0.7;
              if (rect.top < threshold && rect.bottom > 0) {
                newVisibleCards.add(feature.id);
              }
            }
          });
          setVisibleCards(newVisibleCards);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.02) 0%, transparent 50%)
        `,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            backgroundColor:
              i % 2 === 0
                ? "rgba(102, 126, 234, 0.1)"
                : "rgba(240, 147, 251, 0.1)",
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float${i % 3} ${
              Math.random() * 15 + 20
            }s ease-in-out infinite`,
            transform: `translateY(${scrollY * (0.1 + Math.random() * 0.1)}px)`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float0 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        @keyframes float1 {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(25px) rotate(-180deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        .smooth-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .smooth-card:hover {
          transform: translateY(-20px) scale(1.02) !important;
        }

        .card-icon {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .smooth-card:hover .card-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .slide-up {
          animation: slideUpSmooth 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        @keyframes slideUpSmooth {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .fade-in {
          animation: fadeInSmooth 1.2s ease-out forwards;
        }

        @keyframes fadeInSmooth {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-button {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .cta-button:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          className="fade-in"
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <h1
            className="gradient-text"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              marginBottom: "1.5rem",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            Tính Năng Đột Phá
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#64748b",
              fontWeight: "300",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Sức mạnh AI tạo video thế hệ mới
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {features.map((feature, index) => {
            const isVisible = visibleCards.has(feature.id);
            const parallaxY = Math.sin((scrollY + index * 100) * 0.002) * 8;

            return (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className={`smooth-card ${isVisible ? "slide-up" : ""}`}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transform: `translateY(${parallaxY}px)`,
                  opacity: isVisible ? 1 : 0,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Border Top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: feature.gradient,
                    borderRadius: "24px 24px 0 0",
                  }}
                />

                {/* Icon */}
                <div
                  className="card-icon"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    background: feature.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontSize: "2rem",
                    boxShadow: `0 8px 32px ${feature.shadowColor}`,
                  }}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "#1e293b",
                    lineHeight: "1.3",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.6",
                    fontSize: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: feature.gradient,
                    borderRadius: "2px",
                  }}
                />

                {/* Hover Glow Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${feature.shadowColor} 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    zIndex: -1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesParallax;
