export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MemoryTrail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

