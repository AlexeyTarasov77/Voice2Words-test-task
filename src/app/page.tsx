import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhwOVy1oaLg3vQ62BLtmITMs18JlORaYVsbN5TD61FeL7GgVeNqdk2NezOOFIkvrBG0OhJpf4qek8q0swYqXG_9Xhl3J-DNxiblx1Djo33vx6iWet3xHt2LTAlo-i0HyPQHnH189olr2NSBorG5w2SKhmknfhR3MqYJxGPXlU4AcHcyAjKHhx9DTMYZ6ITlmeMBUKhOLeEzkT4w-eZUtki8Scb3YPFKyZLjup6-mxuGamxocMStY7lQQ0WhzInpMKaR3BjQBcF-dc")' }}
            >
              <div className="flex flex-col gap-2 text-center">
                <h1
                  className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                >
                  Transform Your Voice into Text
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Voice2Words is a powerful voice-to-text application that accurately transcribes your spoken words into written text. Whether you're dictating notes,
                  transcribing interviews, or creating content, Voice2Words makes it easy to capture your thoughts and ideas.
                </h2>
              </div>
              <Button className="p-6 text-xl" asChild>
                <Link href="/dashboard" prefetch={false}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
