import { useCallback, useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { useCreateNewMessage } from 'src/hooks/use-create-new-message'

function NewMessageNode({ id, data, isConnectable }: NodeProps) {
  const { createMessage, loading } = useCreateNewMessage(id)
  const [input, setInput] = useState('')

  const handleOnchange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])
  const hanldeSubmit = () => {
    console.log(input)
    createMessage(input)
  }
  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Card className="tw-w-[350px]">
          <CardHeader>
            <CardTitle>Send Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tw-grid tw-w-full tw-gap-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                onChange={handleOnchange}
                disabled={!data.ready || loading}
                placeholder="Type your message here."
                id="message"
              />
            </div>
          </CardContent>
          <CardFooter className="tw-flex tw-justify-between">
            <Button onClick={hanldeSubmit} disabled={!data.ready || loading} className="tw-w-full">
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
}

export default NewMessageNode
